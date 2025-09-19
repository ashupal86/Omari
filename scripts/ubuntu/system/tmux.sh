#!/bin/bash
# tmux Installation Script for Ubuntu
# Installs tmux from official Ubuntu repositories

set -euo pipefail

APP_NAME="tmux"
PACKAGE_NAME="tmux"

# Check if tmux is already installed
if command -v tmux >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(tmux -V))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install tmux
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v tmux >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(tmux -V))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
