#!/bin/bash
# Zsh Installation Script for Ubuntu
# Installs Zsh from official Ubuntu repositories

set -euo pipefail

APP_NAME="Zsh"
PACKAGE_NAME="zsh"

# Check if Zsh is already installed
if command -v zsh >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(zsh --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install Zsh
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v zsh >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(zsh --version))"
    echo "Note: To set zsh as default shell, run: chsh -s $(command -v zsh)"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
