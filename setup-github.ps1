# GitHub Setup Script for Disney Entitlements Dashboard
# This script will initialize Git and prepare your project for GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Disney Dashboard - GitHub Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if Git is installed
Write-Host "Step 1: Checking Git installation..." -ForegroundColor Yellow
$gitInstalled = Get-Command git -ErrorAction SilentlyContinue
if ($gitInstalled) {
    $gitVersion = git --version
    Write-Host "Success: Git is installed: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "Error: Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""

# Step 2: Initialize Git repository
Write-Host "Step 2: Initializing Git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "Success: Git repository already initialized" -ForegroundColor Green
} else {
    git init
    Write-Host "Success: Git repository initialized" -ForegroundColor Green
}

Write-Host ""

# Step 3: Configure Git (if not already configured)
Write-Host "Step 3: Checking Git configuration..." -ForegroundColor Yellow
$userName = git config user.name 2>$null
$userEmail = git config user.email 2>$null

if ([string]::IsNullOrEmpty($userName)) {
    Write-Host "Git user name not set. Please enter your name:" -ForegroundColor Yellow
    $userName = Read-Host "Your Name"
    git config user.name "$userName"
    Write-Host "Success: Git user name set to: $userName" -ForegroundColor Green
} else {
    Write-Host "Success: Git user name: $userName" -ForegroundColor Green
}

if ([string]::IsNullOrEmpty($userEmail)) {
    Write-Host "Git email not set. Please enter your email:" -ForegroundColor Yellow
    $userEmail = Read-Host "Your Email"
    git config user.email "$userEmail"
    Write-Host "Success: Git email set to: $userEmail" -ForegroundColor Green
} else {
    Write-Host "Success: Git email: $userEmail" -ForegroundColor Green
}

Write-Host ""

# Step 4: Verify .gitignore exists
Write-Host "Step 4: Checking .gitignore file..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "Success: .gitignore file exists" -ForegroundColor Green
} else {
    Write-Host "Error: .gitignore file not found!" -ForegroundColor Red
    Write-Host "This is important for security. Please create it before continuing." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""

# Step 5: Check for sensitive files
Write-Host "Step 5: Checking for sensitive files..." -ForegroundColor Yellow
$foundSensitiveFiles = $false

# Check for Excel files
$excelFiles = Get-ChildItem -Path . -Recurse -Include *.xlsx,*.xls,*.xlsm -ErrorAction SilentlyContinue
if ($excelFiles) {
    $foundSensitiveFiles = $true
    Write-Host "Warning: Found Excel files:" -ForegroundColor Yellow
    foreach ($file in $excelFiles) {
        Write-Host "  - $($file.Name)" -ForegroundColor Yellow
    }
}

# Check for JSON data files
if (Test-Path "data") {
    $jsonFiles = Get-ChildItem -Path "data" -Filter *.json -ErrorAction SilentlyContinue
    if ($jsonFiles) {
        $foundSensitiveFiles = $true
        Write-Host "Warning: Found JSON data files:" -ForegroundColor Yellow
        foreach ($file in $jsonFiles) {
            Write-Host "  - $($file.Name)" -ForegroundColor Yellow
        }
    }
}

if ($foundSensitiveFiles) {
    Write-Host ""
    Write-Host "IMPORTANT: These files contain sensitive data and should NOT be committed to GitHub." -ForegroundColor Red
    Write-Host "The .gitignore file will prevent them from being added." -ForegroundColor Green
} else {
    Write-Host "Success: No sensitive files found in project root" -ForegroundColor Green
}

Write-Host ""

# Step 6: Show what will be committed
Write-Host "Step 6: Preparing files for commit..." -ForegroundColor Yellow
Write-Host "Files that will be added to Git:" -ForegroundColor Gray
git add -n . 2>$null | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
Write-Host ""
Write-Host "Success: Files ready to commit (sensitive files excluded by .gitignore)" -ForegroundColor Green

Write-Host ""

# Step 7: Create initial commit
Write-Host "Step 7: Creating initial commit..." -ForegroundColor Yellow
$commitExists = git log --oneline 2>$null
if ($commitExists) {
    Write-Host "Success: Repository already has commits" -ForegroundColor Green
    Write-Host "Latest commit: $($commitExists[0])" -ForegroundColor Gray
} else {
    git add .
    git commit -m "Initial commit: Disney Entitlements Dashboard"
    Write-Host "Success: Initial commit created" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 8: Instructions for GitHub
Write-Host "NEXT STEPS - Push to GitHub:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a PRIVATE repository on GitHub:" -ForegroundColor White
Write-Host "   - Go to: https://github.com/new" -ForegroundColor Gray
Write-Host "   - Repository name: disney-entitlements-dashboard" -ForegroundColor Gray
Write-Host "   - Select: Private" -ForegroundColor Gray
Write-Host "   - Do NOT initialize with README, .gitignore, or license" -ForegroundColor Gray
Write-Host "   - Click 'Create repository'" -ForegroundColor Gray
Write-Host ""

Write-Host "2. After creating the repository, run these commands:" -ForegroundColor White
Write-Host "   (Replace YOUR-USERNAME with your actual GitHub username)" -ForegroundColor Gray
Write-Host ""
Write-Host "   git remote add origin https://github.com/YOUR-USERNAME/disney-entitlements-dashboard.git" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "3. When prompted for authentication:" -ForegroundColor White
Write-Host "   - Username: Your GitHub username" -ForegroundColor Gray
Write-Host "   - Password: Use a Personal Access Token (not your GitHub password)" -ForegroundColor Gray
Write-Host "   - Get token from: https://github.com/settings/tokens" -ForegroundColor Gray
Write-Host ""

Write-Host "Need detailed instructions? See GITHUB-SETUP.md" -ForegroundColor Yellow
Write-Host ""

# Optional: Open GitHub in browser
Write-Host "Would you like to open GitHub in your browser now? (Y/N)" -ForegroundColor Yellow
$openBrowser = Read-Host
if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
    Start-Process "https://github.com/new"
    Write-Host "Success: Opening GitHub in browser..." -ForegroundColor Green
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Made with Bob
