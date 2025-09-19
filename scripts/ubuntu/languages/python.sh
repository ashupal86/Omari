#!/bin/bash
# Python Installation Script for Ubuntu
# Installs Python 3 and pip from official Ubuntu repositories

set -euo pipefail

APP_NAME="Python"
PACKAGE_NAME="python3"

# Check if Python 3 is already installed
if command -v python3 >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(python3 --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install Python 3 and pip
sudo apt install -y "$PACKAGE_NAME" python3-pip python3-venv

# Verify installation
if command -v python3 >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(python3 --version))"
    echo "✓ pip installed ($(pip3 --version))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
