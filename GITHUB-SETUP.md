# 🔒 Setting Up a Private GitHub Repository

Complete guide to create and share your Disney Entitlements Dashboard via a private GitHub repository.

## 📋 Prerequisites

- GitHub account (free account works)
- Git installed on your computer
- Your dashboard project ready to upload

---

## 🚀 Part 1: Create Private GitHub Repository

### Step 1: Create Repository on GitHub

1. **Go to GitHub**: https://github.com
2. **Sign in** to your account
3. **Click** the "+" icon in top-right corner
4. **Select** "New repository"

### Step 2: Configure Repository Settings

Fill in the form:

- **Repository name**: `disney-entitlements-dashboard`
- **Description**: "Interactive dashboard for Disney Enterprise Entitlements analysis"
- **Visibility**: ✅ **Select "Private"** (very important!)
- **Initialize repository**: 
  - ❌ Do NOT check "Add a README file"
  - ❌ Do NOT add .gitignore (we already have one)
  - ❌ Do NOT choose a license
- **Click** "Create repository"

### Step 3: Note Your Repository URL

After creation, you'll see a URL like:
```
https://github.com/YOUR-USERNAME/disney-entitlements-dashboard.git
```

Keep this handy - you'll need it soon!

---

## 💻 Part 2: Upload Your Project to GitHub

### Step 1: Open PowerShell

Navigate to your project folder:

```powershell
cd "C:\Users\MikeArbrouet\Disney\entitlements-dashboard"
```

### Step 2: Initialize Git (if not already done)

```powershell
# Initialize git repository
git init

# Check status
git status
```

### Step 3: Verify .gitignore is Working

```powershell
# This should NOT show your Excel or JSON files
git status
```

✅ **Good**: Only shows code files, documentation
❌ **Bad**: Shows .xlsx, .json files → Check your .gitignore file

### Step 4: Add Files to Git

```powershell
# Add all files (respecting .gitignore)
git add .

# Verify what will be committed
git status
```

You should see:
- ✅ HTML, CSS, JavaScript files
- ✅ Python scripts
- ✅ Documentation files
- ✅ requirements.txt
- ❌ NO Excel files
- ❌ NO JSON files

### Step 5: Create First Commit

```powershell
git commit -m "Initial commit: Disney Entitlements Dashboard"
```

### Step 6: Connect to GitHub

Replace `YOUR-USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/disney-entitlements-dashboard.git
```

### Step 7: Push to GitHub

```powershell
# Push to GitHub
git push -u origin main
```

If you get an error about "master" vs "main", try:
```powershell
git branch -M main
git push -u origin main
```

### Step 8: Authenticate

GitHub will prompt for authentication:

**Option A: Personal Access Token (Recommended)**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Disney Dashboard"
4. Select scopes: ✅ repo (all sub-options)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

**Option B: GitHub Desktop**
1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Add your local repository
4. Push changes through the GUI

---

## 👥 Part 3: Share with Colleagues

### Step 1: Add Collaborators

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Collaborators"** in left sidebar
4. Click **"Add people"**
5. Enter colleague's GitHub username or email
6. Select their permission level:
   - **Read**: Can view and clone only
   - **Write**: Can view, clone, and push changes
   - **Admin**: Full control
7. Click **"Add [username] to this repository"**

They'll receive an email invitation.

### Step 2: Share Repository URL

Send colleagues this information:

```
Repository: https://github.com/YOUR-USERNAME/disney-entitlements-dashboard
Access: Private (invitation sent)

To get started:
1. Accept the GitHub invitation
2. Clone the repository
3. Follow RECIPIENT-SETUP.md
```

---

## 📥 Part 4: Instructions for Recipients

### For Colleagues Receiving Access

**Step 1: Accept Invitation**
- Check your email for GitHub invitation
- Click "Accept invitation"

**Step 2: Clone Repository**

Open PowerShell:
```powershell
# Navigate to where you want the project
cd "C:\Users\YourName\Projects"

# Clone the repository
git clone https://github.com/OWNER-USERNAME/disney-entitlements-dashboard.git

# Navigate into folder
cd disney-entitlements-dashboard
```

**Step 3: Follow Setup**
- Open `RECIPIENT-SETUP.md`
- Follow the 7-step setup process
- Add your own Excel file
- Start using the dashboard

**Step 4: Get Updates**

When the owner makes updates:
```powershell
cd "C:\Users\YourName\Projects\disney-entitlements-dashboard"
git pull
```

---

## 🔄 Part 5: Making Updates

### When You Make Changes

```powershell
# Check what changed
git status

# Add changes
git add .

# Commit with descriptive message
git commit -m "Add brand/customer product table feature"

# Push to GitHub
git push
```

### Notify Team Members

After pushing updates, notify your team:
```
Subject: Dashboard Update Available

New features added to the dashboard!

To update:
1. Open PowerShell
2. cd to your dashboard folder
3. Run: git pull

Changes:
- Added brand/customer product table
- Fixed product chart display
- Added Disney logo to header
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep repository **Private**
- Use .gitignore to exclude sensitive data
- Review files before committing (`git status`)
- Use meaningful commit messages
- Regularly update your local copy (`git pull`)

### ❌ DON'T:
- Make repository public
- Commit Excel files with customer data
- Commit JSON files with customer data
- Share your Personal Access Token
- Commit passwords or API keys

### Verify Security

Before each commit:
```powershell
# Check what will be committed
git status

# If you see Excel or JSON files, STOP!
# They should be blocked by .gitignore
```

---

## 🛠️ Troubleshooting

### "Permission denied" when pushing

**Solution**: Set up authentication
- Use Personal Access Token (see Step 8 above)
- Or use GitHub Desktop
- Or set up SSH keys

### "Repository not found"

**Solution**: Check repository URL
```powershell
# View current remote
git remote -v

# Update if wrong
git remote set-url origin https://github.com/CORRECT-USERNAME/disney-entitlements-dashboard.git
```

### Accidentally committed sensitive file

**Solution**: Remove from Git history
```powershell
# Remove file from Git (keeps local copy)
git rm --cached path/to/sensitive-file.xlsx

# Commit the removal
git commit -m "Remove sensitive file"

# Push
git push
```

### Merge conflicts

**Solution**: Pull before pushing
```powershell
# Get latest changes
git pull

# Resolve any conflicts in files
# Then commit and push
git add .
git commit -m "Resolve conflicts"
git push
```

---

## 📊 Repository Structure

Your GitHub repository will contain:

```
disney-entitlements-dashboard/
├── .gitignore                 # Security file
├── README.md                  # Main documentation
├── QUICKSTART.md             # Quick start guide
├── RECIPIENT-SETUP.md        # Setup for new users
├── SHARING.md                # Sharing guide
├── GITHUB-SETUP.md           # This file
├── INSTALLATION.md           # Detailed installation
├── MIGRATION.md              # Metabase migration
├── dashboard/
│   ├── index.html            # Main dashboard
│   ├── css/
│   │   └── dashboard.css
│   └── js/
│       ├── data-loader.js
│       ├── charts.js
│       ├── filters.js
│       └── utils.js
├── scripts/
│   ├── excel_to_json.py      # Conversion script
│   ├── excel_to_sqlite.py    # Database script
│   └── requirements.txt      # Python dependencies
├── data/                      # Empty (users add their own)
└── metabase/
    └── docker-compose.yml    # Metabase setup
```

**NOT in repository** (blocked by .gitignore):
- ❌ Excel files
- ❌ JSON data files
- ❌ Database files
- ❌ Personal notes

---

## 🎯 Quick Reference Commands

### Daily Workflow

```powershell
# Get latest changes
git pull

# Make your changes...

# Check what changed
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push
```

### First Time Setup

```powershell
cd "C:\Users\MikeArbrouet\Disney\entitlements-dashboard"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/disney-entitlements-dashboard.git
git push -u origin main
```

### Clone for Recipients

```powershell
git clone https://github.com/OWNER-USERNAME/disney-entitlements-dashboard.git
cd disney-entitlements-dashboard
# Follow RECIPIENT-SETUP.md
```

---

## 📧 Email Template for Sharing

```
Subject: Disney Entitlements Dashboard - GitHub Access

Hi [Name],

I've added you as a collaborator to our Disney Entitlements Dashboard repository on GitHub.

📦 Repository: https://github.com/YOUR-USERNAME/disney-entitlements-dashboard
🔒 Access: Private (invitation sent to your email)

To get started:

1. Accept the GitHub invitation (check your email)
2. Clone the repository:
   git clone https://github.com/YOUR-USERNAME/disney-entitlements-dashboard.git
3. Follow RECIPIENT-SETUP.md for installation
4. Add your Excel file and start using the dashboard

To get updates:
   cd disney-entitlements-dashboard
   git pull

Need help? Check the documentation files or let me know!

Best regards,
[Your Name]
```

---

## ✅ Checklist

Before sharing repository:

- [ ] Repository is set to **Private**
- [ ] .gitignore file is in place
- [ ] No Excel files in repository
- [ ] No JSON data files in repository
- [ ] All documentation files included
- [ ] README.md is up to date
- [ ] Tested clone on another machine
- [ ] Collaborators added with appropriate permissions
- [ ] Team members notified

---

## 🎓 Additional Resources

- **GitHub Docs**: https://docs.github.com
- **Git Basics**: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- **GitHub Desktop**: https://desktop.github.com
- **Personal Access Tokens**: https://github.com/settings/tokens

---

**Your dashboard is now securely shared via GitHub! 🚀**