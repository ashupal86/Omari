#!/bin/bash
# VLC Media Player Installation Script for Ubuntu
# Installs VLC from official Ubuntu repositories

set -euo pipefail

APP_NAME="VLC Media Player"
PACKAGE_NAME="vlc"

# Check if VLC is already installed
if command -v vlc >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(vlc --version | head -n1))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install VLC
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v vlc >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(vlc --version | head -n1))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
