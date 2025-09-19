# Git Installation Script for Windows
# Installs Git using Chocolatey

# Check if Chocolatey is installed
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Error "Chocolatey is not installed. Please run choco-install.ps1 first."
    exit 1
}

$AppName = "Git"
$PackageName = "git"

# Check if Git is already installed
if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "✓ $AppName is already installed ($(git --version))" -ForegroundColor Green
    exit 0
}

Write-Host "Installing $AppName..." -ForegroundColor Yellow

# Install Git
choco install $PackageName -y

# Verify installation
if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "✓ $AppName installed successfully ($(git --version))" -ForegroundColor Green
} else {
    Write-Error "Failed to install $AppName"
    exit 1
}
