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
import os, sys, json, wave, struct, urllib.request, urllib.error, contextlib

KEY = os.environ.get("ELEVENLABS_API_KEY")
if not KEY:
    sys.exit("ELEVENLABS_API_KEY not set — see instructions.")
VOICE_OVERRIDE = os.environ.get("ELEVENLABS_VOICE_ID")
MODEL = os.environ.get("ELEVENLABS_MODEL", "eleven_multilingual_v2")
OUT = "public/vo"
SR = 44100
os.makedirs(OUT, exist_ok=True)

def api(path, method="GET", data=None, raw=False):
    req = urllib.request.Request("https://api.elevenlabs.io" + path, method=method)
    req.add_header("xi-api-key", KEY)
    if data is not None:
        req.add_header("Content-Type", "application/json")
        data = json.dumps(data).encode()
    with urllib.request.urlopen(req, data=data, timeout=60) as r:
        return r.read() if raw else json.loads(r.read())

def pick_voice():
    if VOICE_OVERRIDE:
        return VOICE_OVERRIDE
    voices = api("/v1/voices").get("voices", [])
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
    pcm = api(f"/v1/text-to-speech/{voice}?output_format=pcm_{SR}", "POST", body, raw=True)
    with contextlib.closing(wave.open(out, "w")) as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(pcm)
    with contextlib.closing(wave.open(out, "r")) as w:
        return w.getnframes() / float(w.getframerate())

def main():
    scenes = json.load(open("scripts/narration.json"))
    voice = pick_voice()
    print(f"Using voice: {voice}", file=sys.stderr)
    durations = {}
    for s in scenes:
        out = f"{OUT}/vo{s['scene']:02d}.wav"
        d = synth(voice, s["text"], out)
        durations[s["scene"]] = round(d, 2)
        print(f"scene {s['scene']:02d}: {d:5.1f}s  -> {out}", file=sys.stderr)
    json.dump(durations, open("scripts/vo_durations.json", "w"), indent=2)
    print("OK", len(durations), "clips; durations -> scripts/vo_durations.json")

if __name__ == "__main__":
    main()
