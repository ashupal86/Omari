#!/bin/bash
# htop Installation Script for Ubuntu
# Installs htop from official Ubuntu repositories

set -euo pipefail

APP_NAME="htop"
PACKAGE_NAME="htop"

# Check if htop is already installed
if command -v htop >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(htop --version | head -n1))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install htop
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v htop >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(htop --version | head -n1))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
