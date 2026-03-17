#!/bin/bash
# Start the brainstorm server and output connection info

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SESSION_ID="$$-$(date +%s)"
SCREEN_DIR="/tmp/brainstorm-${SESSION_ID}"
PID_FILE="${SCREEN_DIR}/.server.pid"
LOG_FILE="${SCREEN_DIR}/.server.log"

mkdir -p "$SCREEN_DIR"
cd "$SCRIPT_DIR"

nohup env BRAINSTORM_DIR="$SCREEN_DIR" node server.js > "$LOG_FILE" 2>&1 &
SERVER_PID=$!
echo "$SERVER_PID" > "$PID_FILE"

for i in {1..50}; do
  if grep -q "server-started" "$LOG_FILE" 2>/dev/null; then
    grep "server-started" "$LOG_FILE" | head -1
    exit 0
  fi
  sleep 0.1
done

echo '{"error": "Server failed to start"}'
exit 1
