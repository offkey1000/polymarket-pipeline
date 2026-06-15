#!/usr/bin/env python3
"""Generate per-scene narration with ElevenLabs and report durations.

Requires (set in the environment):
  ELEVENLABS_API_KEY   - your ElevenLabs API key
  ELEVENLABS_VOICE_ID  - (optional) the exact voice id to use; if unset, the
                         script lists voices and picks a male Indian-sounding one.
Requires the host `api.elevenlabs.io` to be on the environment egress allowlist.

Writes public/vo/voNN.wav (16-bit PCM) and prints each clip's duration so the
video can be re-timed to the voice.
"""
import os, sys, json, wave, struct, urllib.request, urllib.error, contextlib, glob, subprocess

KEY = os.environ.get("ELEVENLABS_API_KEY")
if not KEY:
    sys.exit("ELEVENLABS_API_KEY not set — see instructions.")
VOICE_OVERRIDE = os.environ.get("ELEVENLABS_VOICE_ID")
MODEL = os.environ.get("ELEVENLABS_MODEL", "eleven_multilingual_v2")
# Fallback voice used when the API key lacks voices_read and cannot list voices.
# Override with ELEVENLABS_VOICE_ID for a specific (e.g. Indian-male) voice.
DEFAULT_VOICE = os.environ.get("ELEVENLABS_DEFAULT_VOICE", "pNInz6obpgDQGcFmaJgB")
OUT = "public/vo"
SR = 44100
os.makedirs(OUT, exist_ok=True)

def find_ffmpeg():
    from shutil import which
    cands = (glob.glob("node_modules/@remotion/compositor-*/ffmpeg") +
             glob.glob("node_modules/@remotion/compositor-*/ffmpeg.exe"))
    sys_ff = which("ffmpeg")
    if sys_ff:
        cands.append(sys_ff)
    for c in cands:
        try:
            subprocess.run([c, "-version"], capture_output=True, check=True)
            return c
        except Exception:
            continue
    sys.exit("no runnable ffmpeg found (run npm install first).")

FFMPEG = find_ffmpeg()

import time

def api(path, method="GET", data=None, raw=False, retries=4):
    body = json.dumps(data).encode() if data is not None else None
    for attempt in range(retries + 1):
        req = urllib.request.Request("https://api.elevenlabs.io" + path, method=method)
        req.add_header("xi-api-key", KEY)
        if body is not None:
            req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req, data=body, timeout=120) as r:
                return r.read() if raw else json.loads(r.read())
        except urllib.error.HTTPError as e:
            # Retry transient throttling/server errors (incl. the occasional 401 blip).
            if e.code in (401, 429, 500, 502, 503, 504) and attempt < retries:
                wait = 2 ** attempt
                print(f"  {path.split('?')[0]} -> HTTP {e.code}; retry in {wait}s", file=sys.stderr)
                time.sleep(wait)
                continue
            raise

def pick_voice():
    if VOICE_OVERRIDE:
        return VOICE_OVERRIDE
    try:
        voices = api("/v1/voices").get("voices", [])
    except urllib.error.HTTPError as e:
        if e.code in (401, 403):
            print(f"  voice listing unavailable (key lacks voices_read); "
                  f"using default voice {DEFAULT_VOICE}. "
                  f"Set ELEVENLABS_VOICE_ID to choose a specific voice.", file=sys.stderr)
            return DEFAULT_VOICE
        raise
    def score(v):
        labels = " ".join(str(x).lower() for x in (v.get("labels") or {}).values())
        name = v.get("name", "").lower()
        s = 0
        if "indian" in labels or "india" in labels: s += 10
        if "male" in labels: s += 4
        if any(k in name for k in ("raju", "niraj", "arjun", "vikram", "ravi", "deep")): s += 3
        return s
    voices.sort(key=score, reverse=True)
    for v in voices:
        print(f"  candidate: {v.get('name')}  labels={v.get('labels')}  id={v.get('voice_id')}", file=sys.stderr)
    return voices[0]["voice_id"] if voices else sys.exit("no voices on account")

def synth(voice, text, out):
    body = {
        "text": text,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.8, "style": 0.15, "use_speaker_boost": True},
    }
    # pcm_* output is Pro-tier only; request mp3 (allowed on all tiers) and
    # decode to a 16-bit mono WAV at SR with ffmpeg so the pipeline is unchanged.
    mp3 = api(f"/v1/text-to-speech/{voice}?output_format=mp3_44100_128", "POST", body, raw=True)
    subprocess.run(
        [FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", "pipe:0",
         "-ar", str(SR), "-ac", "1", "-c:a", "pcm_s16le", out],
        input=mp3, check=True)
    with contextlib.closing(wave.open(out, "r")) as w:
        return w.getnframes() / float(w.getframerate())

def main():
    scenes = json.load(open("scripts/narration.json"))
    voice = pick_voice()
    print(f"Using voice: {voice}", file=sys.stderr)
    # Resume by default: keep already-rendered clips so a re-run after a
    # transient failure doesn't burn credits. Set VO_FORCE=1 to regenerate all.
    force = os.environ.get("VO_FORCE") == "1"
    durations = {}
    for s in scenes:
        out = f"{OUT}/vo{s['scene']:02d}.wav"
        if not force and os.path.exists(out) and os.path.getsize(out) > 1024:
            with contextlib.closing(wave.open(out, "r")) as w:
                d = w.getnframes() / float(w.getframerate())
            durations[s["scene"]] = round(d, 2)
            print(f"scene {s['scene']:02d}: {d:5.1f}s  (kept)  -> {out}", file=sys.stderr)
            continue
        d = synth(voice, s["text"], out)
        durations[s["scene"]] = round(d, 2)
        print(f"scene {s['scene']:02d}: {d:5.1f}s  -> {out}", file=sys.stderr)
    json.dump(durations, open("scripts/vo_durations.json", "w"), indent=2)
    # refresh src/voMeta.ts from the actual audio so the video re-times itself
    subprocess.run([sys.executable, "scripts/write_vometa.py", "--from-audio"], check=True)
    print("OK", len(durations), "clips; voMeta refreshed from audio")

if __name__ == "__main__":
    main()
