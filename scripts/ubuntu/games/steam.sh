#!/bin/bash
# Steam Installation Script for Ubuntu
# Installs Steam from official Ubuntu repositories

set -euo pipefail

APP_NAME="Steam"
PACKAGE_NAME="steam"

# Check if Steam is already installed
if command -v steam >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Enable multiverse repository
sudo add-apt-repository -y multiverse

# Update package list
sudo apt update

# Install Steam
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v steam >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
