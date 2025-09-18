#!/bin/bash

# removeAutoTyper.sh
# This script removes the fullyolo.js functionality from Cursor's main JavaScript file

set -e  # Exit on any error

CURSOR_JS_FILE="/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js"

echo "Removing fullyolo.js from Cursor..."

# Check if Cursor JS file exists
if [ ! -f "$CURSOR_JS_FILE" ]; then
    echo "Error: Cursor main JS file not found at: $CURSOR_JS_FILE"
    echo "Please make sure Cursor is installed in the Applications folder."
    exit 1
fi

# Check if auto-typer is installed
if ! grep -q "fullyolo.js start" "$CURSOR_JS_FILE"; then
    echo "Auto-typer is not currently installed in Cursor."
    exit 0
fi

# Remove the auto-typer code using awk
echo "Removing auto-typer code..."

# Use awk to remove everything between the start and end markers (inclusive)
awk '
BEGIN { removing = 0 }
/\/\/ fullyolo\.js start/ { 
    removing = 1; 
    next 
}
/\/\/ fullyolo\.js end/ && removing { 
    removing = 0; 
    next 
}
removing { next }
!removing { print }
' "$CURSOR_JS_FILE" > "${CURSOR_JS_FILE}.tmp"

# Replace original file with cleaned version
mv "${CURSOR_JS_FILE}.tmp" "$CURSOR_JS_FILE"

echo "fullyolo.js successfully removed!"
