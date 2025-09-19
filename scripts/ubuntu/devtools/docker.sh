#!/bin/bash
# Docker Installation Script for Ubuntu
# Installs Docker from official Docker repository

set -euo pipefail

APP_NAME="Docker"
PACKAGE_NAME="docker-ce"

# Check if Docker is already installed
if command -v docker >/dev/null 2>&1; then
    echo "✓ $APP_NAME is already installed ($(docker --version))"
    exit 0
fi

echo "Installing $APP_NAME..."

# Update package list
sudo apt update

# Install required packages
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package list
sudo apt update

# Install Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add current user to docker group
sudo usermod -aG docker "$USER"

# Verify installation
if command -v docker >/dev/null 2>&1; then
    echo "✓ $APP_NAME installed successfully ($(docker --version))"
    echo "Note: You may need to log out and back in for group changes to take effect"
else
    echo "✗ Failed to install $APP_NAME"
    exit 1
fi