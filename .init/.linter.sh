#!/bin/bash
cd /home/kavia/workspace/code-generation/cluequest-cartoon-crime-solver-95861-7b11599f/frontend_locked_room_mystery
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

