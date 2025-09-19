#!/bin/bash
# Wget Installation Script for Ubuntu
# Installs wget from official Ubuntu repositories

set -euo pipefail

APP_NAME="wget"
PACKAGE_NAME="wget"

# Check if wget is already installed
if command -v wget >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(wget --version | head -n1))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install wget
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v wget >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(wget --version | head -n1))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
