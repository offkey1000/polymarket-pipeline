# Voiceover runbook (ElevenLabs)

Everything is wired. In a **fresh session** where `api.elevenlabs.io` is on the
network egress allowlist, finishing the narrated film is two commands.

## Prerequisites
- New Claude Code on the web session on branch `claude/remotion-install-mgsbbu`
  (network-policy changes only apply to new sessions).
- `api.elevenlabs.io` (and `*.elevenlabs.io`) allowlisted — **Custom** network
  access with "also include default package managers" checked.
- ElevenLabs API key available (paste it; it is not stored in the repo).
- Optional: `ELEVENLABS_VOICE_ID` for a specific Indian-male voice. If unset,
  the generator lists the account's voices and auto-picks a male/Indian one.

## Step 1 — generate the narration (also re-times the video)
```bash
ELEVENLABS_API_KEY=sk_xxx python3 scripts/gen_vo_elevenlabs.py
```
This writes `public/vo/vo01.wav … vo22.wav`, prints each clip's duration, and
refreshes `src/voMeta.ts` from the real audio (so each scene lasts as long as
its voiceover, with a short lead-in and tail).

To force a specific voice:
```bash
ELEVENLABS_API_KEY=sk_xxx ELEVENLABS_VOICE_ID=<voice_id> python3 scripts/gen_vo_elevenlabs.py
```

## Step 2 — render, compress, commit
```bash
npx remotion render src/index.ts KeralaCut out/KeralaCut.mp4 --jpeg-quality=95
node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg -y -i out/KeralaCut.mp4 \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 22 -preset medium \
  -c:a aac -b:a 160k -movflags +faststart out/final.mp4
mv -f out/final.mp4 out/KeralaCut.mp4
cp out/KeralaCut.mp4 video/KeralaCut.mp4
git add -f video/KeralaCut.mp4 && git add -A
git commit -m "Narrated KSIEP film (ElevenLabs voiceover)" && git push -u origin claude/remotion-install-mgsbbu
```

## Notes
- Narration text: `scripts/narration.json` (edit wording here, then re-run step 1).
- Scene order and audio wiring: `src/KeralaCut.tsx` (durations come from `voMeta`).
- The narration is explanatory (teaches the concept), ~12 min total.
- For a tighter cut, trim the longer scenes' text in `narration.json` and re-run.
