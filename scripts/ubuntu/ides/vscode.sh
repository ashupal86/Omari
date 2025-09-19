#!/bin/bash
# Visual Studio Code Installation Script for Ubuntu
# Installs VS Code from official Microsoft repository

set -euo pipefail

APP_NAME="Visual Studio Code"
PACKAGE_NAME="code"

# Check if VS Code is already installed
if command -v code >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(code --version | head -n1))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install required packages
sudo apt install -y wget gpg

# Add Microsoft GPG key
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

# Update package list
sudo apt update

# Install VS Code
sudo apt install -y "$PACKAGE_NAME"

# Clean up
rm -f packages.microsoft.gpg

# Verify installation
if command -v code >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(code --version | head -n1))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
