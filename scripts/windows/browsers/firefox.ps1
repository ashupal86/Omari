# Firefox Browser Installation Script for Windows
# Installs Firefox using Chocolatey

# Check if Chocolatey is installed
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Error "Chocolatey is not installed. Please run choco-install.ps1 first."
    exit 1
}

$AppName = "Firefox"
$PackageName = "firefox"

# Check if Firefox is already installed
if (Get-Command firefox -ErrorAction SilentlyContinue) {
    Write-Host "✓ $AppName is already installed" -ForegroundColor Green
    exit 0
}

Write-Host "Installing $AppName..." -ForegroundColor Yellow

# Install Firefox
choco install $PackageName -y

# Verify installation
if (Get-Command firefox -ErrorAction SilentlyContinue) {
    Write-Host "✓ $AppName installed successfully" -ForegroundColor Green
} else {
    Write-Error "Failed to install $AppName"
    exit 1
}
