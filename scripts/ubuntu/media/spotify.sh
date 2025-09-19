#!/bin/bash
# Spotify Installation Script for Ubuntu
# Installs Spotify from official Spotify repository

set -euo pipefail

APP_NAME="Spotify"
PACKAGE_NAME="spotify-client"

# Check if Spotify is already installed
if command -v spotify >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed"
    exit 0
fi

echo "Installing $APP_NAME..."

# Add Spotify repository
curl -sS https://download.spotify.com/debian/pubkey_5E3C45D7B312C643.gpg | sudo apt-key add -
echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list

# Update package list
sudo apt update

# Install Spotify
sudo apt install -y "$PACKAGE_NAME"

# Verify installation
if command -v spotify >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
