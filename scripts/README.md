# Omari Installation Scripts

This directory contains atomic, idempotent, and safe installation scripts for various applications across different operating systems and distributions.

## Structure

```
scripts/
├── ubuntu/          # Ubuntu/Debian scripts
├── fedora/          # Fedora scripts  
├── arch/            # Arch Linux scripts
├── windows/         # Windows PowerShell scripts
└── index.json       # Script mapping file
```

Each distribution directory contains category subdirectories:
- `browsers/` - Web browsers
- `media/` - Media players and streaming apps
- `devtools/` - Development tools and utilities
- `ides/` - Integrated Development Environments
- `languages/` - Programming language runtimes
- `system/` - System utilities and tools
- `comms/` - Communication applications
- `games/` - Gaming platforms and tools

## Script Features

All scripts are designed to be:

- **Atomic**: Each script installs one application
- **Idempotent**: Safe to run multiple times
- **Safe**: Check for existing installations before proceeding
- **Official**: Use only official repositories and sources
- **Error-handling**: Proper error checking and exit codes

## Usage

### Linux Scripts

```bash
# Make script executable
chmod +x scripts/ubuntu/browsers/firefox.sh

# Run the script
./scripts/ubuntu/browsers/firefox.sh
```

### Windows Scripts

```powershell
# First, install Chocolatey (if not already installed)
.\scripts\windows\choco-install.ps1

# Then install applications
.\scripts\windows\browsers\firefox.ps1
```

## Available Applications

### Browsers
- Firefox
- Google Chrome
- Brave Browser
- Opera
- Chromium (Ubuntu)

### Media
- VLC Media Player
- Spotify
- MPV
- Audacious
- Clementine
- Rhythmbox

### Development Tools
- Git
- Curl
- Wget
- Docker
- Podman
- Node.js
- Python 3
- OpenJDK
- PostgreSQL
- MySQL/MariaDB

### IDEs
- Visual Studio Code
- Cursor
- Neovim
- Sublime Text
- JetBrains Toolbox
- Eclipse
- Android Studio

### Programming Languages
- Go
- Rust
- PHP
- Ruby
- Python
- Java
- C/C++ toolchains
- TypeScript
- R
- Kotlin
- Dart/Flutter

### System Tools
- htop
- tmux
- zsh
- fish
- build-essential/base-devel
- flatpak
- snapd
- OBS Studio
- GParted
- Timeshift

### Communication
- Discord
- Slack
- Zoom
- Microsoft Teams
- Telegram
- Signal
- Thunderbird

### Gaming
- Steam
- Lutris
- Wine
- ProtonUp-Qt
- Heroic Launcher
- PlayOnLinux

## CI/CD

The repository includes GitHub Actions workflows that:
- Run `shellcheck` on all Linux shell scripts
- Validate PowerShell syntax on Windows scripts
- Verify `index.json` structure and file existence

## Contributing

When adding new scripts:

1. Follow the existing naming convention: `{app-name}.sh` or `{app-name}.ps1`
2. Include proper error handling and idempotency checks
3. Use only official repositories and sources
4. Update `index.json` with the new script path
5. Test the script on the target platform
6. Ensure the script passes CI validation

## License

This project is licensed under the same terms as the main Omari project.
