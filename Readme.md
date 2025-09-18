This is a script to automatically run Cursor MCP and command. You'll need to run the `install.sh` script again after update Cursor

### Usage:
- Run `install.sh`
- Restart the Cursor window to apply changes.

### Add blacklist string:
- Change the this line in `fullyolo.js`: `const blacklisted_command_strings = ["rm"]`
- Add more string into the list
- Run `uninstall.sh`
- Run `install.sh` to install new
- Restart the Cursor window to apply changes.