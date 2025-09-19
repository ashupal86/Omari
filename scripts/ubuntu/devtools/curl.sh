#!/bin/bash
# Curl Installation Script for Ubuntu
# Installs curl from official Ubuntu repositories

set -euo pipefail

APP_NAME="curl"
PACKAGE_NAME="curl"

# Check if curl is already installed
if command -v curl >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(curl --version | head -n1))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install curl
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v curl >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(curl --version | head -n1))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
