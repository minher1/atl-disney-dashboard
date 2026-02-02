# 🚀 Quick Start: Deploy to GitHub Pages

**Goal:** Get your password-protected dashboard online in 10 minutes.

---

## ✅ What's Already Done

- ✅ Login page with password protection
- ✅ Authentication system (24-hour sessions)
- ✅ Logout functionality
- ✅ Dashboard files ready
- ✅ Security configured

**Password:** `DisneyIBM2026!!`

---

## 📝 5-Step Deployment

### Step 1: Open PowerShell (2 minutes)

1. Press `Windows + X`
2. Select **Windows PowerShell** or **Terminal**
3. Navigate to your dashboard folder:

```powershell
cd "C:\Users\MikeArbrouet\OneDrive - IBM\entitlements-dashboard"
```

---

### Step 2: Initialize Git (1 minute)

Copy and paste these commands one at a time:

```powershell
git init
```

```powershell
git add .
```

```powershell
git commit -m "Initial commit: Password-protected dashboard"
```

---

### Step 3: Create GitHub Repository (3 minutes)

1. Go to **github.com** (log in if needed)
2. Click **+** icon (top right) → **New repository**
3. Fill in:
   - **Name:** `disney-entitlements-dashboard`
   - **Visibility:** ✅ **Private** (IMPORTANT!)
   - ✅ Check "Add a README file"
4. Click **Create repository**
5. **Copy the repository URL** (looks like: `https://github.com/YOUR-USERNAME/disney-entitlements-dashboard.git`)

---

### Step 4: Push to GitHub (2 minutes)

Replace `YOUR-USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/disney-entitlements-dashboard.git
```

```powershell
git branch -M main
```

```powershell
git push -u origin main
```

**Note:** You may be prompted to log in to GitHub.

---

### Step 5: Enable GitHub Pages (2 minutes)

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes

---

## 🎉 You're Live!

Your dashboard URL:
```
https://YOUR-USERNAME.github.io/disney-entitlements-dashboard/login.html
```

**Example:**
```
https://mikearbrouet.github.io/disney-entitlements-dashboard/login.html
```

---

## 📧 Share with FML

**Copy this message:**

```
Hi [Name],

Access the Disney Entitlements Dashboard here:
https://YOUR-USERNAME.github.io/disney-entitlements-dashboard/login.html

Password: DisneyIBM2026!!

Instructions:
1. Click the link
2. Enter the password
3. View the dashboard

The session lasts 24 hours. Use the logout button when done.

Let me know if you have questions!
```

---

## 🔄 Update Dashboard Later

When you make changes:

```powershell
cd "C:\Users\MikeArbrouet\OneDrive - IBM\entitlements-dashboard"
git add .
git commit -m "Update dashboard"
git push
```

Changes go live in 1-2 minutes!

---

## 🆘 Troubleshooting

**"Repository not found"**
- Check repository name matches exactly
- Verify you're logged into correct GitHub account

**"Permission denied"**
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@ibm.com"
```

**"Dashboard shows 404"**
- Wait 2-3 minutes after enabling Pages
- Check URL includes `/login.html` at the end
- Verify Settings → Pages shows green checkmark

**"Password not working"**
- Password is case-sensitive: `DisneyIBM2026!!`
- Clear browser cache (Ctrl+Shift+Delete)

---

## 📚 Need More Details?

See **GITHUB-DEPLOYMENT.md** for:
- Detailed explanations
- Security features
- Adding collaborators
- Automated updates
- Monitoring usage

---

## ✅ Deployment Checklist

- [ ] PowerShell opened
- [ ] Git initialized
- [ ] GitHub repository created (PRIVATE!)
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Dashboard URL works
- [ ] Login tested
- [ ] Password works
- [ ] Dashboard loads
- [ ] Ready to share with FML

---

**Total Time:** ~10 minutes  
**Difficulty:** Easy  
**Cost:** Free

🎉 **Happy deploying!**