#!/bin/bash
# Start the Sanyam Engineering backend server
cd "$(dirname "$0")"
echo "Starting Sanyam Engineering API server..."
python3 -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
