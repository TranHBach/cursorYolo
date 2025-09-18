#!/bin/bash

# installAutoTyper.sh
# This script injects the auto-typer functionality into Cursor's main JavaScript file

set -e  # Exit on any error

CURSOR_JS_FILE="/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js"
AUTO_TYPER_JS="fullyolo.js"

echo "Installing Auto-Typer into Cursor..."

# Check if Cursor JS file exists
if [ ! -f "$CURSOR_JS_FILE" ]; then
    echo "Error: Cursor main JS file not found at: $CURSOR_JS_FILE"
    echo "Please make sure Cursor is installed in the Applications folder."
    exit 1
fi

# Check if auto-typer.js exists
if [ ! -f "$AUTO_TYPER_JS" ]; then
    echo "Error: auto-typer.js not found at: $AUTO_TYPER_JS"
    exit 1
fi

# Check if auto-typer is already installed
if grep -q "fullyolo.js" "$CURSOR_JS_FILE"; then
    echo "Auto-typer is already installed in Cursor."
    echo "Please run removeAutoTyper.sh first to remove the existing installation."
    exit 1
fi

# Create temporary file with the injected code
echo "Injecting auto-typer code..."
{
    echo "// fullyolo.js start"
    cat "$AUTO_TYPER_JS"
    echo "// fullyolo.js end"
    echo ""
    cat "$CURSOR_JS_FILE"
} > "${CURSOR_JS_FILE}.tmp"

# Replace original file with modified version
mv "${CURSOR_JS_FILE}.tmp" "$CURSOR_JS_FILE"

echo "fullyolo.js successfully installed!"
