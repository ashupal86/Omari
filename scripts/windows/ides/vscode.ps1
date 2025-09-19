# Visual Studio Code Installation Script for Windows
# Installs VS Code using Chocolatey

# Check if Chocolatey is installed
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Error "Chocolatey is not installed. Please run choco-install.ps1 first."
    exit 1
}

$AppName = "Visual Studio Code"
$PackageName = "vscode"

# Check if VS Code is already installed
if (Get-Command code -ErrorAction SilentlyContinue) {
    Write-Host "✓ $AppName is already installed" -ForegroundColor Green
    exit 0
}

Write-Host "Installing $AppName..." -ForegroundColor Yellow

# Install VS Code
choco install $PackageName -y

# Verify installation
if (Get-Command code -ErrorAction SilentlyContinue) {
    Write-Host "✓ $AppName installed successfully" -ForegroundColor Green
} else {
    Write-Error "Failed to install $AppName"
    exit 1
}
