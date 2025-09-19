#!/bin/bash
# Firefox Browser Installation Script for Ubuntu
# Installs Firefox from official Ubuntu repositories

set -euo pipefail

APP_NAME="Firefox"
PACKAGE_NAME="firefox"

# Check if Firefox is already installed
if command -v firefox >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(firefox --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install Firefox
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v firefox >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(firefox --version))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
