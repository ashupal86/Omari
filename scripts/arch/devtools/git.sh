#!/bin/bash
# Git Installation Script for Arch Linux
# Installs Git from official Arch repositories

set -euo pipefail

APP_NAME="Git"
PACKAGE_NAME="git"

# Check if Git is already installed
if command -v git >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(git --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package database
sudo pacman -Sy

# Install Git
sudo pacman -S --noconfirm "$PACKAGE_NAME"

# Verify installation
if command -v git >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(git --version))"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi