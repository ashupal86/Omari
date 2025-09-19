#!/bin/bash
# Go Installation Script for Ubuntu
# Installs Go from official Go repository

set -euo pipefail

APP_NAME="Go"
GO_VERSION="1.21.5"
INSTALL_DIR="/usr/local"

# Check if Go is already installed
if command -v go >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(go version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Download and install Go
cd /tmp
wget "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz"
sudo tar -C "$INSTALL_DIR" -xzf "go${GO_VERSION}.linux-amd64.tar.gz"

# Add Go to PATH in profile
if ! grep -q "export PATH=\$PATH:/usr/local/go/bin" ~/.profile; then
    {
        echo "export PATH=\$PATH:/usr/local/go/bin"
        echo "export GOPATH=\$HOME/go"
        echo "export PATH=\$PATH:\$GOPATH/bin"
    } >> ~/.profile
fi

# Source profile for current session
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

# Clean up
rm -f "go${GO_VERSION}.linux-amd64.tar.gz"

# Verify installation
if command -v go >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(go version))"
    echo "Note: You may need to log out and back in for PATH changes to take effect"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi
