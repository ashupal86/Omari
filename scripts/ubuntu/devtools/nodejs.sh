#!/bin/bash
# Node.js Installation Script for Ubuntu
# Installs Node.js from NodeSource repository

set -euo pipefail

APP_NAME="Node.js"
NODE_VERSION="20"

# Check if Node.js is already installed
if command -v node >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(node --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install required packages
sudo apt install -y curl

# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
if command -v node >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(node --version))"
    echo "✓ npm installed ($(npm --version))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
