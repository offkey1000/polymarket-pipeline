#!/usr/bin/env bash
# Finalize the rendered film: compress to a faststart H.264/AAC master,
# embed copyright metadata, then attach a C2PA content-credentials manifest.
#
#   scripts/finalize_video.sh <rendered.mp4> <final.mp4>
#
# C2PA signing uses an ES256 cert/key pair. By default it looks in out/c2pa/
# (an ephemeral self-signed pair generated for this repo). For production,
# point C2PA_CERT / C2PA_KEY at your own certificate (ideally from a
# C2PA-recognized CA) so validators show a trusted signer.
set -euo pipefail

IN="${1:-out/KeralaCut.mp4}"
OUT="${2:-out/KeralaCut.final.mp4}"
FF="$(ls node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg 2>/dev/null || echo ffmpeg)"
C2PATOOL="${C2PATOOL:-$HOME/.cargo/bin/c2patool}"
MANIFEST="scripts/c2pa_manifest.json"
CERT="${C2PA_CERT:-out/c2pa/cert.pem}"
KEY="${C2PA_KEY:-out/c2pa/key.pem}"

TITLE="KSIEP — K.P.P. Nambiar 2.0: The Visionary Returns"
COPYRIGHT="© 2026 Premchand Kurup. All rights reserved."

echo ">> compress + embed metadata"
TMP="$(mktemp -u).mp4"
"$FF" -y -i "$IN" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 22 -preset medium \
  -c:a aac -b:a 160k -movflags +faststart \
  -metadata title="$TITLE" \
  -metadata author="Premchand Kurup" \
  -metadata artist="Premchand Kurup" \
  -metadata copyright="$COPYRIGHT" \
  -metadata comment="Story/Script/Direction: Premchand Kurup. Screenplay: Shekar Menon. $COPYRIGHT" \
  "$TMP"

echo ">> attach C2PA content credentials"
if [ -x "$C2PATOOL" ] && [ -f "$CERT" ] && [ -f "$KEY" ]; then
  C2PA_PRIVATE_KEY="$(cat "$KEY")" C2PA_SIGN_CERT="$(cat "$CERT")" \
    "$C2PATOOL" "$TMP" --manifest "$MANIFEST" --output "$OUT" --force
  echo ">> C2PA manifest attached"
else
  echo "!! c2patool/cert not available — shipping metadata-only master"
  mv -f "$TMP" "$OUT"
fi
rm -f "$TMP"

ls -la "$OUT"
