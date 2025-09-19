#!/bin/bash
# Google Chrome Installation Script for Ubuntu
# Installs Chrome from official Google repository

set -euo pipefail

APP_NAME="Google Chrome"
PACKAGE_NAME="google-chrome-stable"

# Check if Chrome is already installed
if command -v google-chrome >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(google-chrome --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Add Google Chrome repository
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list

# Update package list
sudo apt update

# Install Chrome
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v google-chrome >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(google-chrome --version))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
