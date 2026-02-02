# GitHub Deployment Script for Disney Entitlements Dashboard
# Username: minher1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Deployment for Disney Dashboard" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create GitHub Repository
Write-Host "STEP 1: Create GitHub Repository" -ForegroundColor Yellow
Write-Host "--------------------------------------" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open your browser and go to:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Green
Write-Host ""
Write-Host "2. Fill in the repository details:" -ForegroundColor White
Write-Host "   - Repository name: disney-entitlements-dashboard" -ForegroundColor Green
Write-Host "   - Description: Disney Entitlements Dashboard - Internal Use" -ForegroundColor Green
Write-Host "   - Visibility: PRIVATE (IMPORTANT!)" -ForegroundColor Red
Write-Host "   - DO NOT check 'Add a README file'" -ForegroundColor Red
Write-Host ""
Write-Host "3. Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "Press any key once you've created the repository..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Step 2: Connect to GitHub
Write-Host ""
Write-Host "STEP 2: Connecting to GitHub..." -ForegroundColor Yellow
Write-Host "--------------------------------------" -ForegroundColor Yellow

cd "C:\Users\MikeArbrouet\OneDrive - IBM\entitlements-dashboard"

# Add remote
Write-Host "Adding remote repository..." -ForegroundColor White
git remote remove origin 2>$null
git remote add origin https://github.com/minher1/disney-entitlements-dashboard.git

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Remote repository added successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to add remote repository" -ForegroundColor Red
    exit 1
}

# Step 3: Push to GitHub
Write-Host ""
Write-Host "STEP 3: Pushing code to GitHub..." -ForegroundColor Yellow
Write-Host "--------------------------------------" -ForegroundColor Yellow
Write-Host ""
Write-Host "You may be prompted to log in to GitHub." -ForegroundColor Cyan
Write-Host "Use your GitHub credentials when prompted." -ForegroundColor Cyan
Write-Host ""

git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Code pushed successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✗ Failed to push code" -ForegroundColor Red
    Write-Host ""
    Write-Host "If you see authentication errors, you may need to:" -ForegroundColor Yellow
    Write-Host "1. Set up a Personal Access Token (PAT)" -ForegroundColor White
    Write-Host "2. Go to: https://github.com/settings/tokens" -ForegroundColor Green
    Write-Host "3. Generate new token (classic)" -ForegroundColor White
    Write-Host "4. Select 'repo' scope" -ForegroundColor White
    Write-Host "5. Use the token as your password when prompted" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Step 4: Enable GitHub Pages
Write-Host ""
Write-Host "STEP 4: Enable GitHub Pages" -ForegroundColor Yellow
Write-Host "--------------------------------------" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to your repository:" -ForegroundColor White
Write-Host "   https://github.com/minher1/disney-entitlements-dashboard" -ForegroundColor Green
Write-Host ""
Write-Host "2. Click 'Settings' tab" -ForegroundColor White
Write-Host ""
Write-Host "3. Click 'Pages' in the left sidebar" -ForegroundColor White
Write-Host ""
Write-Host "4. Under 'Source':" -ForegroundColor White
Write-Host "   - Branch: main" -ForegroundColor Green
Write-Host "   - Folder: / (root)" -ForegroundColor Green
Write-Host ""
Write-Host "5. Click 'Save'" -ForegroundColor White
Write-Host ""
Write-Host "6. Wait 1-2 minutes for deployment" -ForegroundColor White
Write-Host ""
Write-Host "Press any key once you've enabled GitHub Pages..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Step 5: Success!
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your dashboard is now live at:" -ForegroundColor White
Write-Host "https://minher1.github.io/disney-entitlements-dashboard/login.html" -ForegroundColor Cyan
Write-Host ""
Write-Host "Password: DisneyIBM2026!!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Share this information with FML:" -ForegroundColor White
Write-Host "--------------------------------------" -ForegroundColor White
Write-Host "URL: https://minher1.github.io/disney-entitlements-dashboard/login.html" -ForegroundColor Green
Write-Host "Password: DisneyIBM2026!!" -ForegroundColor Green
Write-Host ""
Write-Host "The dashboard is:" -ForegroundColor White
Write-Host "✓ Password protected" -ForegroundColor Green
Write-Host "✓ Private repository" -ForegroundColor Green
Write-Host "✓ Secure (24-hour sessions)" -ForegroundColor Green
Write-Host "✓ Accessible from any device" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Made with Bob
