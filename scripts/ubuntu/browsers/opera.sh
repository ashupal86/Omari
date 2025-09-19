#!/bin/bash
# Opera Browser Installation Script for Ubuntu
# Installs Opera from official Opera repository

set -euo pipefail

APP_NAME="Opera Browser"
PACKAGE_NAME="opera-stable"

# Check if Opera is already installed
if command -v opera >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed"
    exit 0
fi

echo "Installing $APP_NAME..."

# Add Opera repository
wget -qO- https://deb.opera.com/archive.key | sudo apt-key add -
echo "deb https://deb.opera.com/opera-stable/ stable non-free" | sudo tee /etc/apt/sources.list.d/opera.list

# Update package list
sudo apt update

# Install Opera
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v opera >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
