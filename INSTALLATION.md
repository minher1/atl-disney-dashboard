# Installation Guide

Complete setup instructions for the Disney Enterprise Entitlements Dashboard.

## Prerequisites

Before you begin, you'll need:

1. **Python 3.7 or higher**
2. **Web browser** (Chrome, Firefox, or Edge recommended)
3. **Text editor** (VS Code, Notepad++, or similar)
4. **Docker Desktop** (optional, only for Metabase)

## Step 1: Install Python

### Check if Python is Already Installed

Open PowerShell and run:

```powershell
python --version
```

If you see a version number (e.g., `Python 3.11.0`), skip to Step 2.

### Install Python

1. Go to https://www.python.org/downloads/
2. Download the latest Python 3.x installer for Windows
3. Run the installer
4. **IMPORTANT**: Check the box "Add Python to PATH"
5. Click "Install Now"
6. Wait for installation to complete
7. Click "Close"

### Verify Installation

Open a **new** PowerShell window and run:

```powershell
python --version
pip --version
```

You should see version numbers for both.

## Step 2: Install Python Dependencies

Navigate to the scripts folder and install required packages:

```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"
pip install -r requirements.txt
```

You should see:

```
Successfully installed pandas-2.1.4 openpyxl-3.1.2 ...
```

## Step 3: Convert Excel to JSON

Run the conversion script:

```powershell
python excel_to_json.py
```

**Expected Output:**

```
============================================================
Disney Enterprise Entitlements - Excel to JSON Converter
============================================================

Reading Excel file: C:\Users\YourName\Desktop\Disney\Disney_Enterprise__Entitlements_by_Customer_Site_v3.xlsx
Successfully read XXXX rows
Columns found: XX
Writing JSON to: C:\Users\YourName\Disney\entitlements-dashboard\data\entitlements.json
✓ Successfully converted XXXX records to JSON
✓ Output file: C:\Users\YourName\Disney\entitlements-dashboard\data\entitlements.json

=== Summary Statistics ===
Unique Brands: XX
Unique Customers: XXX
Unique Regions: XX
Total Software license or appliance quantity: XXX,XXX

✓ Conversion completed successfully!

Next steps:
1. Open dashboard/index.html in your web browser
2. The dashboard will automatically load the data
```

## Step 4: Start the Dashboard

### Method 1: Python HTTP Server (Recommended)

```powershell
cd ..\dashboard
python -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

### Method 2: VS Code Live Server

1. Open VS Code
2. Install "Live Server" extension
3. Open `dashboard/index.html`
4. Right-click and select "Open with Live Server"

### Method 3: Direct File Access

Simply double-click `dashboard/index.html`

**Note**: Some browsers may block loading JSON files from the file system. Use Method 1 or 2 if you encounter issues.

## Step 5: Verify Dashboard is Working

You should see:

✅ Four KPI cards with numbers  
✅ Four interactive charts  
✅ Business opportunities section with counts  
✅ Data table with your entitlements  
✅ Filter dropdowns populated with your data  

If you see "Loading..." forever, check the Troubleshooting section below.

## Optional: Install Docker Desktop (for Metabase)

Only needed if you want to use Metabase for advanced analytics.

1. Go to https://www.docker.com/products/docker-desktop
2. Download Docker Desktop for Windows
3. Run the installer
4. Follow the installation wizard
5. Restart your computer if prompted
6. Start Docker Desktop
7. Wait for it to fully start (whale icon in system tray)

### Test Docker

```powershell
docker --version
docker-compose --version
```

You should see version numbers for both.

## Troubleshooting

### Python Not Found

**Error**: `Python was not found`

**Solution**:
1. Install Python (see Step 1)
2. Make sure "Add Python to PATH" was checked during installation
3. Restart PowerShell after installation
4. If still not working, manually add Python to PATH:
   - Search for "Environment Variables" in Windows
   - Edit "Path" variable
   - Add: `C:\Users\YourUsername\AppData\Local\Programs\Python\Python3XX`

### pip Not Found

**Error**: `pip is not recognized`

**Solution**:
```powershell
python -m pip install --upgrade pip
```

### Excel File Not Found

**Error**: `FileNotFoundError: Excel file not found`

**Solution**:
1. Verify the Excel file exists at the specified path
2. Edit `scripts/excel_to_json.py`
3. Update line 11 with the correct path:
   ```python
   EXCEL_FILE = r"C:\Your\Actual\Path\To\File.xlsx"
   ```

### Permission Denied

**Error**: `PermissionError: [Errno 13] Permission denied`

**Solution**:
1. Close Excel if the file is open
2. Run PowerShell as Administrator
3. Check file permissions

### Module Not Found

**Error**: `ModuleNotFoundError: No module named 'pandas'`

**Solution**:
```powershell
pip install pandas openpyxl
```

### Dashboard Shows "Loading..." Forever

**Possible Causes**:
1. JSON file not created
2. Using file:// protocol (CORS issue)
3. Browser blocking local files

**Solutions**:
1. Verify `data/entitlements.json` exists
2. Use Python HTTP server (Method 1)
3. Check browser console (F12) for errors

### Port 8000 Already in Use

**Error**: `OSError: [Errno 48] Address already in use`

**Solution**:
```powershell
# Use a different port
python -m http.server 8080
# Then open http://localhost:8080
```

### Charts Not Displaying

**Possible Causes**:
1. No internet connection (CDN resources)
2. Browser blocking scripts
3. JavaScript errors

**Solutions**:
1. Check internet connection
2. Disable ad blockers
3. Try a different browser
4. Check browser console (F12) for errors

## Verification Checklist

Before reporting issues, verify:

- [ ] Python is installed and in PATH
- [ ] pip is working
- [ ] pandas and openpyxl are installed
- [ ] Excel file exists at specified path
- [ ] JSON file was created in data/ folder
- [ ] Using HTTP server (not file://)
- [ ] Browser is modern (Chrome, Firefox, Edge)
- [ ] No firewall blocking localhost
- [ ] JavaScript is enabled in browser

## System Requirements

### Minimum Requirements
- **OS**: Windows 10 or later
- **RAM**: 4GB
- **Disk Space**: 500MB
- **Browser**: Chrome 90+, Firefox 88+, Edge 90+
- **Python**: 3.7 or higher

### Recommended Requirements
- **OS**: Windows 11
- **RAM**: 8GB
- **Disk Space**: 2GB (for Metabase)
- **Browser**: Latest Chrome or Edge
- **Python**: 3.11 or higher

## Post-Installation

After successful installation:

1. **Bookmark the Dashboard**: Save `http://localhost:8000` as a bookmark
2. **Create Desktop Shortcut**: Create a batch file to start the server quickly
3. **Schedule Updates**: Set a reminder to update data weekly
4. **Explore Features**: Try all filters and export functionality
5. **Read Documentation**: Review README.md for detailed usage

## Creating a Desktop Shortcut

Create a file named `Start-Dashboard.bat` on your desktop:

```batch
@echo off
cd "C:\Users\YourName\Disney\entitlements-dashboard\dashboard"
start http://localhost:8000
python -m http.server 8000
```

Double-click this file to start the dashboard automatically.

## Updating the Dashboard

When you receive a new Excel file:

```powershell
# 1. Navigate to scripts folder
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"

# 2. Run conversion
python excel_to_json.py

# 3. Refresh browser
# Press F5 or Ctrl+R in your browser
```

## Uninstallation

To remove the dashboard:

1. Stop the Python server (Ctrl+C in PowerShell)
2. Delete the `entitlements-dashboard` folder
3. (Optional) Uninstall Python packages:
   ```powershell
   pip uninstall pandas openpyxl -y
   ```

## Getting Help

If you encounter issues:

1. Check this installation guide
2. Review QUICKSTART.md for common tasks
3. Check README.md for detailed documentation
4. Review browser console (F12) for errors
5. Verify all prerequisites are met

## Next Steps

After installation:

1. ✅ Read QUICKSTART.md for basic usage
2. ✅ Explore the dashboard features
3. ✅ Try filtering and exporting data
4. ✅ Review README.md for advanced features
5. ✅ Consider Metabase for advanced analytics (see MIGRATION.md)

---

**Installation Complete! 🎉**

Your Disney Enterprise Entitlements Dashboard is ready to use!
