#!/usr/bin/env bash
# Finalize the rendered film:
#   1. compress to a faststart H.264/AAC master (two-pass to a size target)
#   2. embed copyright metadata
#   3. attach a C2PA content-credentials manifest (signed, ES256)
#
#   scripts/finalize_video.sh <rendered.mp4> <final.mp4> [target_kbps]
#
# C2PA signing uses an ES256 cert/key pair (default out/c2pa/, an ephemeral
# self-signed pair). For production, set C2PA_CERT / C2PA_KEY to your own
# certificate (ideally from a C2PA-recognized CA) for a trusted signer.
set -euo pipefail

IN="${1:-out/KeralaCut.mp4}"
OUT="${2:-out/KeralaCut.final.mp4}"
VBITRATE="${3:-820}"          # video kbps; two-pass for a predictable size
FF="$(ls node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg 2>/dev/null || echo ffmpeg)"
C2PATOOL="${C2PATOOL:-$HOME/.cargo/bin/c2patool}"
BASE_MANIFEST="scripts/c2pa_manifest.json"
CERT="${C2PA_CERT:-$(pwd)/out/c2pa/cert.pem}"
KEY="${C2PA_KEY:-$(pwd)/out/c2pa/key.pem}"

TITLE="KSIEP — K.P.P. Nambiar 2.0: The Visionary Returns"
COPYRIGHT="© 2026 Premchand Kurup. All rights reserved."
TMP="$(mktemp -u).mp4"
PASSLOG="$(mktemp -u)"

echo ">> two-pass compress + embed metadata (${VBITRATE}k video)"
"$FF" -y -i "$IN" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -b:v "${VBITRATE}k" -preset medium -pass 1 -passlogfile "$PASSLOG" -an -f mp4 /dev/null
"$FF" -y -i "$IN" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -b:v "${VBITRATE}k" -preset medium -pass 2 -passlogfile "$PASSLOG" \
  -c:a aac -b:a 160k -movflags +faststart \
  -metadata title="$TITLE" \
  -metadata author="Premchand Kurup" \
  -metadata artist="Premchand Kurup" \
  -metadata copyright="$COPYRIGHT" \
  -metadata comment="Story/Script/Direction: Premchand Kurup. Screenplay: Shekar Menon. $COPYRIGHT" \
  "$TMP"

echo ">> attach C2PA content credentials"
if [ -x "$C2PATOOL" ] && [ -f "$CERT" ] && [ -f "$KEY" ]; then
  SIGN_MANIFEST="$(mktemp -u).json"
  C2PA_KEY_ABS="$KEY" C2PA_CERT_ABS="$CERT" python3 - "$BASE_MANIFEST" "$SIGN_MANIFEST" <<'PY'
import json, os, sys
base, out = sys.argv[1], sys.argv[2]
m = json.load(open(base))
m["alg"] = "es256"
m["private_key"] = os.environ["C2PA_KEY_ABS"]
m["sign_cert"]  = os.environ["C2PA_CERT_ABS"]
json.dump(m, open(out, "w"), indent=2)
PY
  "$C2PATOOL" "$TMP" -m "$SIGN_MANIFEST" -o "$OUT" -f
  rm -f "$SIGN_MANIFEST"
  echo ">> C2PA manifest attached"
else
  echo "!! c2patool/cert not available — shipping metadata-only master"
  mv -f "$TMP" "$OUT"
fi
rm -f "$TMP" "${PASSLOG}"* 2>/dev/null || true

ls -la "$OUT"
python3 -c "import os;print('%.1f MiB'%(os.path.getsize('$OUT')/1048576))"
