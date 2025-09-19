#!/bin/bash
# Brave Browser Installation Script for Ubuntu
# Installs Brave from official Brave repository

set -euo pipefail

APP_NAME="Brave Browser"
PACKAGE_NAME="brave-browser"

# Check if Brave is already installed
if command -v brave-browser >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(brave-browser --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Add Brave repository
sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list

# Update package list
sudo apt update

# Install Brave
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v brave-browser >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(brave-browser --version))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
