# 🚀 GitHub Pages Deployment Guide

Complete guide to deploy your password-protected Disney Entitlements Dashboard to GitHub Pages.

---

## 📋 Prerequisites

- GitHub account (free)
- Git installed on your computer
- Your dashboard files ready

---

## 🔐 Security Setup Complete!

✅ **Login page created** (`login.html`)  
✅ **Password:** `DisneyIBM2026!!`  
✅ **Session timeout:** 24 hours  
✅ **Authentication check** added to dashboard  

---

## 🚀 Deployment Steps

### Step 1: Create GitHub Repository

1. Go to **github.com** and log in
2. Click the **+** icon (top right) → **New repository**
3. Repository settings:
   - **Name:** `disney-entitlements-dashboard`
   - **Description:** "Disney Entitlements Dashboard - Internal Use"
   - **Visibility:** ✅ **Private** (IMPORTANT!)
   - ✅ Check "Add a README file"
4. Click **Create repository**

---

### Step 2: Prepare Your Files

Open PowerShell and navigate to your dashboard folder:

```powershell
cd "C:\Users\MikeArbrouet\OneDrive - IBM\entitlements-dashboard"
```

---

### Step 3: Initialize Git Repository

```powershell
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Password-protected dashboard"
```

---

### Step 4: Connect to GitHub

Replace `YOUR-USERNAME` with your GitHub username:

```powershell
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/disney-entitlements-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** You may be prompted to log in to GitHub.

---

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source":
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes for deployment

---

### Step 6: Get Your Dashboard URL

Your dashboard will be available at:
```
https://YOUR-USERNAME.github.io/disney-entitlements-dashboard/login.html
```

**Example:**
```
https://mikearbrouet.github.io/disney-entitlements-dashboard/login.html
```

---

## 🔒 Security Features

### What's Protected:

✅ **Private Repository** - Only you and invited collaborators can see the code  
✅ **Password Protection** - Login required before accessing dashboard  
✅ **Session Management** - Auto-logout after 24 hours  
✅ **Logout Button** - Manual logout option on dashboard  

### What to Share:

**With FML:**
- ✅ Dashboard URL
- ✅ Password: `DisneyIBM2026!!`
- ✅ Instructions: "Click the link, enter password, view dashboard"

**DO NOT Share:**
- ❌ GitHub repository link (keep private)
- ❌ Your GitHub credentials

---

## 👥 Adding Collaborators (Optional)

If you want others to help maintain the dashboard:

1. Go to repository **Settings**
2. Click **Collaborators** (left sidebar)
3. Click **Add people**
4. Enter their GitHub username
5. They'll receive an invitation email

---

## 🔄 Updating the Dashboard

When you make changes:

```powershell
# Navigate to folder
cd "C:\Users\MikeArbrouet\OneDrive - IBM\entitlements-dashboard"

# Add changes
git add .

# Commit changes
git commit -m "Update dashboard data"

# Push to GitHub
git push
```

Changes will be live in 1-2 minutes!

---

## 📊 Updating Data

### Option 1: Manual Update

1. Update your Excel file locally
2. Run `python scripts/excel_to_json.py`
3. Commit and push changes (see above)

### Option 2: Automated Updates

Create a script to automate:

```powershell
# update-and-deploy.ps1
cd "C:\Users\MikeArbrouet\OneDrive - IBM\entitlements-dashboard"
python scripts/excel_to_json.py
git add data/entitlements.json
git commit -m "Auto-update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push
Write-Host "Dashboard updated successfully!"
```

---

## 🆘 Troubleshooting

### "Repository not found"
- Check repository name matches exactly
- Verify you're logged into correct GitHub account

### "Permission denied"
- Set up GitHub authentication:
  ```powershell
  git config --global user.name "Your Name"
  git config --global user.email "your.email@ibm.com"
  ```

### "Dashboard shows 404"
- Wait 2-3 minutes after enabling Pages
- Check Settings → Pages shows green checkmark
- Verify URL includes `/login.html` at the end

### "Password not working"
- Password is case-sensitive: `DisneyIBM2026!!`
- Try clearing browser cache (Ctrl+Shift+Delete)
- Check browser console (F12) for errors

---

## 📧 Sharing with FML

**Email Template:**

```
Subject: Disney Entitlements Dashboard - Secure Access

Hi [FML Name],

I've set up a secure online dashboard for viewing Disney entitlements data.

🔗 Dashboard URL:
https://YOUR-USERNAME.github.io/disney-entitlements-dashboard/login.html

🔐 Password: DisneyIBM2026!!

📱 How to Access:
1. Click the link above
2. Enter the password
3. View the dashboard

The dashboard is:
✅ Password protected
✅ Secure (private repository)
✅ Auto-logout after 24 hours
✅ Accessible from any device

You can use the filters to explore the data, view charts, and export 
results. There's a logout button in the top-right when you're done.

Let me know if you have any questions!

Best,
Mike
```

---

## 🔐 Changing the Password

To change the password:

1. Open `login.html` in a text editor
2. Find line with: `if (password === 'DisneyIBM2026!!')`
3. Change to your new password
4. Save and push to GitHub:
   ```powershell
   git add login.html
   git commit -m "Update password"
   git push
   ```

---

## ✅ Deployment Checklist

Before sharing with FML:

- [ ] Repository is set to **Private**
- [ ] GitHub Pages is enabled
- [ ] Dashboard URL works
- [ ] Login page loads correctly
- [ ] Password works: `DisneyIBM2026!!`
- [ ] Dashboard loads after login
- [ ] Data displays correctly
- [ ] Logout button works
- [ ] Tested on different browser
- [ ] URL saved for sharing

---

## 📊 Monitoring Usage

GitHub provides basic analytics:

1. Go to repository **Insights** tab
2. View **Traffic** to see page views
3. Check **Visitors** to see unique users

**Note:** This only shows repository views, not dashboard usage.

---

## 🔄 Maintenance

### Weekly:
- [ ] Check dashboard still works
- [ ] Verify data is current
- [ ] Test login functionality

### Monthly:
- [ ] Update data from new Excel file
- [ ] Review and update password if needed
- [ ] Check for any GitHub security alerts

---

## 🆘 Support

**If you need help:**

1. Check this guide first
2. Review GitHub's documentation: docs.github.com
3. Check browser console (F12) for errors
4. Contact GitHub support if repository issues

---

## 🎉 You're Done!

Your dashboard is now:
- ✅ Hosted on GitHub Pages
- ✅ Password protected
- ✅ Accessible remotely
- ✅ Secure (private repository)
- ✅ Ready to share with FML

**Dashboard URL:**
```
https://YOUR-USERNAME.github.io/disney-entitlements-dashboard/login.html
```

**Password:**
```
DisneyIBM2026!!
```

---

**Questions?** Review this guide or reach out for help!

Happy dashboarding! 📊✨