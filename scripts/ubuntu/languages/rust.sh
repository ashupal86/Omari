#!/bin/bash
# Rust Installation Script for Ubuntu
# Installs Rust using rustup

set -euo pipefail

APP_NAME="Rust"
RUSTUP_URL="https://sh.rustup.rs"

# Check if Rust is already installed
if command -v rustc >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(rustc --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Install required packages
sudo apt update
sudo apt install -y curl build-essential

# Download and install rustup
curl --proto '=https' --tlsv1.2 -sSf "$RUSTUP_URL" | sh -s -- -y

# Add Rust to PATH for current session
source "$HOME/.cargo/env"

# Verify installation
if command -v rustc >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(rustc --version))"
    echo "Note: You may need to log out and back in for PATH changes to take effect"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
