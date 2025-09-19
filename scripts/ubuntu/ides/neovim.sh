#!/bin/bash
# Neovim Installation Script for Ubuntu
# Installs Neovim from official Ubuntu repositories

set -euo pipefail

APP_NAME="Neovim"
PACKAGE_NAME="neovim"

# Check if Neovim is already installed
if command -v nvim >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(nvim --version | head -n1))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install Neovim
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v nvim >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(nvim --version | head -n1))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
