#!/usr/bin/env pwsh
# Chocolatey Installer for Windows
# Installs Chocolatey package manager if not already installed

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error "This script requires administrator privileges. Please run as administrator."
    exit 1
}

# Check if Chocolatey is already installed
if (Get-Command choco -ErrorAction SilentlyContinue) {
    Write-Host "Chocolatey is already installed. Version: $(choco --version)" -ForegroundColor Green
    exit 0
}

Write-Host "Installing Chocolatey..." -ForegroundColor Yellow

# Set execution policy
Set-ExecutionPolicy Bypass -Scope Process -Force

# Install Chocolatey
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Verify installation
if (Get-Command choco -ErrorAction SilentlyContinue) {
    Write-Host "Chocolatey installed successfully! Version: $(choco --version)" -ForegroundColor Green
} else {
    Write-Error "Failed to install Chocolatey"
    exit 1
}

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Chocolatey installation completed!" -ForegroundColor Green
