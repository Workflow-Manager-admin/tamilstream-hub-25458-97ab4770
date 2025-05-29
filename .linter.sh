#!/bin/bash
cd /home/kavia/workspace/code-generation/tamilstream-hub-25458-97ab4770/tamilstream_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

