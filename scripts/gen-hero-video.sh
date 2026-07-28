#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PROMPT_FILE="scripts/.m02-prompt.txt"
OUT="public/video/hero-simpul.mp4"
mkdir -p public/video

PROMPT_JSON=$(jq -Rs '.' < "$PROMPT_FILE")

BODY=$(jq -n --argjson prompt "$PROMPT_JSON" '{
  instances: [{prompt: $prompt}],
  parameters: {sampleCount:1, aspectRatio:"16:9", durationSeconds:8, resolution:"720p"}
}')

echo "Starting Veo Lite generation..."
START_RESP=$(curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-lite-generate-preview:predictLongRunning?key=${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$BODY")

OP_NAME=$(echo "$START_RESP" | jq -r '.name // empty')
if [ -z "$OP_NAME" ]; then
  echo "FAILED to start operation. Response:"
  echo "$START_RESP"
  exit 1
fi
echo "Operation: $OP_NAME"

DONE="false"
ATTEMPT=0
POLL_RESP=""
while [ "$DONE" != "true" ]; do
  ATTEMPT=$((ATTEMPT+1))
  if [ "$ATTEMPT" -gt 60 ]; then
    echo "FAILED: timed out after 60 polls (~10min)"
    exit 1
  fi
  sleep 10
  POLL_RESP=$(curl -s "https://generativelanguage.googleapis.com/v1beta/${OP_NAME}?key=${GEMINI_API_KEY}")
  DONE=$(echo "$POLL_RESP" | jq -r '.done // false')
  echo "poll #$ATTEMPT done=$DONE"
  ERR=$(echo "$POLL_RESP" | jq -r '.error.message // empty')
  if [ -n "$ERR" ]; then
    echo "FAILED, API error:"
    echo "$POLL_RESP"
    exit 1
  fi
done

VIDEO_URI=$(echo "$POLL_RESP" | jq -r '.response.generateVideoResponse.generatedSamples[0].video.uri // empty')
if [ -z "$VIDEO_URI" ]; then
  echo "FAILED: no video uri in response:"
  echo "$POLL_RESP"
  exit 1
fi
echo "Video URI: $VIDEO_URI"

curl -s -L -o "$OUT" "${VIDEO_URI}&key=${GEMINI_API_KEY}"

SIZE=$(stat -c%s "$OUT" 2>/dev/null || echo 0)
echo "Downloaded $OUT, size=$SIZE bytes"
file "$OUT"

if [ "$SIZE" -lt 100000 ]; then
  echo "FAILED: file too small, likely not a real video"
  cat "$OUT" | head -c 500
  exit 1
fi

if ! file "$OUT" | grep -qi "mp4\|iso media\|mpeg"; then
  echo "FAILED: not a valid video container"
  exit 1
fi

echo "OK: hero video generated and validated."
