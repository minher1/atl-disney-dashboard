# 🚀 Disney Entitlements Dashboard - Setup Instructions

Quick setup guide for new users receiving this dashboard.

## ✅ Prerequisites

- **Windows 10/11** (or Mac/Linux with minor adjustments)
- **Python 3.8 or higher**
- **Your Disney entitlements Excel file**

---

## 📦 Setup Steps (5 Minutes)

### Step 1: Extract Files

Extract the ZIP file to a location like:
```
C:\Users\YourName\Disney\entitlements-dashboard
```

### Step 2: Install Python (if needed)

1. Check if Python is installed:
   ```powershell
   python --version
   ```

2. If not installed, download from: https://www.python.org/downloads/
   - ✅ **IMPORTANT**: Check "Add Python to PATH" during installation
   - Restart your computer after installation

### Step 3: Install Dependencies

Open PowerShell and navigate to the scripts folder:

```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"
pip install -r requirements.txt
```

Wait for installation to complete (about 1-2 minutes).

### Step 4: Add Your Excel File

1. **Copy** your Disney entitlements Excel file to the `scripts` folder
2. **Open** `scripts\excel_to_json.py` in Notepad or any text editor
3. **Update line 11** with your Excel filename:
   ```python
   EXCEL_FILE = r"C:\Users\YourName\Disney\entitlements-dashboard\scripts\YOUR-EXCEL-FILE.xlsx"
   ```
4. **Save** the file

### Step 5: Convert Your Data

Still in PowerShell:

```powershell
python excel_to_json.py
```

✅ You should see:
```
Successfully converted XXXX records to JSON
Output file: ...\data\entitlements.json
```

### Step 6: Start the Dashboard

```powershell
cd ..\dashboard
python -m http.server 8000
```

You should see:
```
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

### Step 7: Open in Browser

Open your web browser and go to:
```
http://localhost:8000
```

🎉 **Success!** Your dashboard should now be running!

---

## 🎯 What You'll See

### Dashboard Features:
- **KPI Cards**: Total records, quantities, brands, customers
- **Interactive Filters**: Filter by brand, region, customer, product
- **Charts**: Brand distribution, top products, regional breakdown, support levels
- **Business Opportunities**: Upsell and renewal opportunities
- **Brand/Customer Table**: Active products with S&S details
- **Data Export**: Download filtered results as CSV

---

## 🔄 Updating Data

When you get a new Excel file:

```powershell
# 1. Replace your Excel file in the scripts folder
# 2. Run the converter again
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"
python excel_to_json.py

# 3. Refresh your browser (F5 or Ctrl+R)
```

---

## ⚠️ Troubleshooting

### Dashboard shows "Loading..." forever

**Problem**: JSON file not found or CORS issue

**Solution**: Make sure you're using Python's HTTP server:
```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\dashboard"
python -m http.server 8000
```
Then use `http://localhost:8000` (NOT `file://`)

### "Python is not recognized"

**Problem**: Python not installed or not in PATH

**Solution**:
1. Reinstall Python from python.org
2. ✅ Check "Add Python to PATH" during installation
3. Restart your computer
4. Try again

### "No module named 'pandas'"

**Problem**: Dependencies not installed

**Solution**:
```powershell
cd scripts
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### "File not found" when converting Excel

**Problem**: Wrong file path in script

**Solution**:
1. Open `scripts\excel_to_json.py` in Notepad
2. Check line 11 - make sure the path matches your Excel file location
3. Use full path with `r` prefix: `r"C:\Full\Path\To\File.xlsx"`
4. Save and try again

### Charts are blank

**Problem**: No data or data format issue

**Solution**:
1. Check browser console (press F12)
2. Verify JSON file was created: `data\entitlements.json`
3. Refresh browser (Ctrl+F5)

---

## 💡 Quick Tips

1. **Bookmark the URL**: Save `http://localhost:8000` as a bookmark
2. **Keep Server Running**: Don't close the PowerShell window while using dashboard
3. **Use Filters**: Combine filters for targeted analysis
4. **Export Data**: Click "Export Data" button to download filtered results
5. **Sort Columns**: Click any table header to sort

---

## 📚 Additional Documentation

- **QUICKSTART.md** - Detailed usage guide
- **README.md** - Complete documentation
- **SHARING.md** - How to share with others

---

## 🆘 Need Help?

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review **QUICKSTART.md** for detailed instructions
3. Press **F12** in browser to check for error messages
4. Contact the person who shared this with you

---

## ✅ Setup Checklist

Before asking for help, verify:

- [ ] Python is installed (`python --version` works)
- [ ] Dependencies installed (`pip list | findstr pandas` shows pandas)
- [ ] Excel file exists at the path specified in script
- [ ] JSON file was created in `data\` folder
- [ ] Using HTTP server (not opening HTML file directly)
- [ ] Browser is modern (Chrome, Firefox, Edge - not IE)
- [ ] No firewall blocking localhost:8000

---

**Enjoy your dashboard! 📊✨**

For questions or issues, contact the person who shared this dashboard with you.