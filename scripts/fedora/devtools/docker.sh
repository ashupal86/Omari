#!/usr/bin/env bash
# Name: Docker
# Category: devtools
# Distros: fedora
set -euo pipefail

if command -v docker >/dev/null 2>&1; then
  echo "docker already installed"
  exit 0
fi

echo "Installing Docker (Fedora)..."
sudo dnf -y remove podman buildah || true
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io
sudo systemctl enable --now docker
echo "docker installed"
