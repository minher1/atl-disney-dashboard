# 📦 Sharing the Disney Entitlements Dashboard

Complete guide for sharing this project with colleagues so they can run it on their machines.

## 🎯 Best Methods to Share

### Method 1: ZIP File (Recommended for Most Users)
**Best for**: Colleagues who need a simple, one-time setup

### Method 2: Git Repository (Recommended for Teams)
**Best for**: Teams that need version control and updates

### Method 3: Network Share
**Best for**: Internal team with shared network drive

---

## 📦 Method 1: ZIP File Distribution

### Step 1: Prepare the Package

1. **Create a clean copy** of the project folder:
   ```powershell
   # Navigate to parent directory
   cd "C:\Users\YourName\Disney"
   
   # Create a ZIP file (Windows 11)
   Compress-Archive -Path "entitlements-dashboard" -DestinationPath "Disney-Dashboard-Package.zip"
   ```

2. **What to include**:
   - ✅ All dashboard files (HTML, CSS, JS)
   - ✅ Python scripts
   - ✅ requirements.txt
   - ✅ Documentation (README.md, QUICKSTART.md, etc.)
   - ✅ Empty `data` folder (for their JSON file)
   - ❌ **DO NOT include**: Your actual Excel file or JSON data (sensitive)

### Step 2: Create Setup Instructions

Include this file (`RECIPIENT-SETUP.md`) in the ZIP:

```markdown
# Disney Entitlements Dashboard - Setup Instructions

## Prerequisites
- Windows 10/11
- Python 3.8 or higher
- Your Disney entitlements Excel file

## Setup (5 minutes)

### 1. Extract Files
Extract this ZIP to a location like:
`C:\Users\YourName\Disney\entitlements-dashboard`

### 2. Install Python (if needed)
- Download from: https://www.python.org/downloads/
- ✅ Check "Add Python to PATH" during installation
- Restart your computer after installation

### 3. Install Dependencies
Open PowerShell and run:
```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"
pip install -r requirements.txt
```

### 4. Add Your Excel File
1. Copy your Disney entitlements Excel file to the `scripts` folder
2. Open `scripts\excel_to_json.py` in Notepad
3. Update line 11 with your Excel filename:
   ```python
   EXCEL_FILE = r"C:\Users\YourName\Disney\entitlements-dashboard\scripts\YOUR-FILE.xlsx"
   ```
4. Save the file

### 5. Convert Data
```powershell
python excel_to_json.py
```

You should see: ✓ Successfully converted XXXX records to JSON

### 6. Start Dashboard
```powershell
cd ..\dashboard
python -m http.server 8000
```

### 7. Open Browser
Go to: http://localhost:8000

🎉 Done! Your dashboard is running!

## Need Help?
- See QUICKSTART.md for detailed usage
- See README.md for full documentation
- Check Troubleshooting section in QUICKSTART.md
```

### Step 3: Share the Package

**Via Email**:
- Attach `Disney-Dashboard-Package.zip`
- Include setup instructions in email body
- Mention file size and extraction requirements

**Via SharePoint/OneDrive**:
- Upload ZIP file
- Share link with colleagues
- Set appropriate permissions

**Via USB Drive**:
- Copy ZIP to USB
- Include printed setup instructions
- Hand deliver to colleague

---

## 🔄 Method 2: Git Repository (For Teams)

### Step 1: Initialize Git Repository

```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard"

# Initialize git
git init

# Create .gitignore file
```

### Step 2: Create .gitignore

Create a file named `.gitignore` with this content:

```
# Sensitive data - DO NOT COMMIT
*.xlsx
*.xls
data/entitlements.json
data/entitlements.db

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/

# OS files
.DS_Store
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
```

### Step 3: Commit and Push

```powershell
# Add files
git add .

# Commit
git commit -m "Initial commit: Disney Entitlements Dashboard"

# Add remote (GitHub, Azure DevOps, etc.)
git remote add origin https://github.com/yourcompany/disney-dashboard.git

# Push
git push -u origin main
```

### Step 4: Share Repository

**For Recipients**:

```powershell
# Clone repository
git clone https://github.com/yourcompany/disney-dashboard.git

# Navigate to folder
cd disney-dashboard

# Follow setup instructions in QUICKSTART.md
```

**Benefits**:
- ✅ Easy updates (`git pull`)
- ✅ Version control
- ✅ Collaboration
- ✅ No large file transfers

---

## 🌐 Method 3: Network Share (Internal Team)

### Step 1: Set Up Shared Location

```powershell
# Copy to network share
Copy-Item -Path "C:\Users\YourName\Disney\entitlements-dashboard" `
          -Destination "\\company-server\shared\Disney-Dashboard" `
          -Recurse
```

### Step 2: Create Shared Data Folder

```powershell
# Create a shared data location
New-Item -Path "\\company-server\shared\Disney-Dashboard\shared-data" -ItemType Directory
```

### Step 3: Update Scripts for Shared Data

Modify `excel_to_json.py` to use shared location:

```python
# Update paths to use network share
EXCEL_FILE = r"\\company-server\shared\Disney-Dashboard\shared-data\entitlements.xlsx"
OUTPUT_FILE = r"\\company-server\shared\Disney-Dashboard\data\entitlements.json"
```

### Step 4: Team Access

**For Team Members**:

```powershell
# Map network drive (optional)
net use Z: \\company-server\shared\Disney-Dashboard

# Navigate to dashboard
cd Z:\dashboard

# Start server
python -m http.server 8000
```

**Benefits**:
- ✅ Centralized data
- ✅ Everyone sees same data
- ✅ Easy updates
- ✅ No duplication

---

## 📋 Pre-Share Checklist

Before sharing, verify:

- [ ] Remove any sensitive data from files
- [ ] Remove your personal Excel file
- [ ] Remove generated JSON/DB files
- [ ] Test on a clean machine if possible
- [ ] Update file paths in scripts to be generic
- [ ] Include all documentation files
- [ ] Test that requirements.txt is complete
- [ ] Verify Python version requirements
- [ ] Include troubleshooting guide
- [ ] Add contact information for support

---

## 🔒 Security Considerations

### Data Sensitivity

**DO NOT SHARE**:
- ❌ Your actual Excel file (contains customer data)
- ❌ Generated JSON files (contains customer data)
- ❌ Database files (contains customer data)
- ❌ Any files with customer names, agreements, or pricing

**SAFE TO SHARE**:
- ✅ HTML, CSS, JavaScript files
- ✅ Python scripts (without hardcoded paths)
- ✅ Documentation
- ✅ Empty folder structure

### Best Practices

1. **Use Generic Paths**: Replace personal paths with placeholders
2. **Encrypt if Emailing**: Use password-protected ZIP
3. **Use Secure Channels**: SharePoint, Teams, internal network
4. **Document Access**: Keep track of who has the dashboard
5. **Version Control**: Use Git for tracking changes

---

## 📝 Sample Email Template

```
Subject: Disney Entitlements Dashboard - Setup Package

Hi [Name],

I'm sharing the Disney Entitlements Dashboard tool that will help you 
analyze our enterprise entitlements data.

📦 Package Contents:
- Interactive web dashboard
- Python data conversion scripts
- Complete documentation

⚡ Quick Setup (5 minutes):
1. Extract the attached ZIP file
2. Install Python (if needed)
3. Run the setup script
4. Add your Excel file
5. Start the dashboard

📖 Documentation Included:
- QUICKSTART.md - Get started in 5 minutes
- README.md - Full documentation
- RECIPIENT-SETUP.md - Step-by-step setup guide

🔒 Security Note:
This package does NOT include any actual data. You'll need to add your 
own Excel file during setup.

Need help? Let me know!

Best regards,
[Your Name]
```

---

## 🆘 Support Guide for Recipients

Create a `SUPPORT.md` file:

```markdown
# Getting Help

## Common Issues

### "Python not found"
Install Python from python.org and restart your computer.

### "Module not found"
Run: `pip install -r requirements.txt`

### "File not found"
Check that your Excel file path is correct in excel_to_json.py

### Dashboard won't load
Make sure you're using `python -m http.server 8000` and accessing 
http://localhost:8000 (not file://)

## Contact

For technical support:
- Email: [your-email@company.com]
- Teams: [Your Teams Channel]
- Phone: [Your Extension]

## Resources

- QUICKSTART.md - Basic usage
- README.md - Full documentation
- Troubleshooting section in QUICKSTART.md
```

---

## 🔄 Updating Shared Dashboards

### For ZIP Distribution

When you make updates:

```powershell
# Create new version
Compress-Archive -Path "entitlements-dashboard" `
                 -DestinationPath "Disney-Dashboard-v2.0.zip"
```

Email recipients:
```
Subject: Dashboard Update - Version 2.0

New features:
- Brand/Customer product table
- Improved charts
- Bug fixes

To update:
1. Backup your current Excel file
2. Extract new ZIP
3. Copy your Excel file back
4. Run conversion script again
```

### For Git Repository

```powershell
# Make changes
git add .
git commit -m "Add brand/customer table feature"
git push

# Recipients update with:
git pull
```

---

## ✅ Final Checklist

Before sending to recipient:

- [ ] Tested on clean machine
- [ ] All sensitive data removed
- [ ] Documentation is clear
- [ ] File paths are generic
- [ ] Requirements.txt is complete
- [ ] Setup instructions included
- [ ] Support contact provided
- [ ] Security guidelines followed
- [ ] Version number documented
- [ ] Change log included (if update)

---

**Ready to share! 🚀**
