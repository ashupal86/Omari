#!/bin/bash
# Discord Installation Script for Ubuntu
# Installs Discord from official Discord repository

set -euo pipefail

APP_NAME="Discord"
PACKAGE_NAME="discord"

# Check if Discord is already installed
if command -v discord >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install required packages
sudo apt install -y wget

# Download Discord .deb package
cd /tmp
wget -O discord.deb "https://discord.com/api/download?platform=linux&format=deb"

# Install Discord
sudo dpkg -i discord.deb
sudo apt-get install -f -y  # Fix any dependency issues

# Clean up
rm -f discord.deb

# Verify installation
if command -v discord >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
