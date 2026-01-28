# Quick Start Guide

Get your Disney Enterprise Entitlements Dashboard running in 5 minutes!

## ⚡ Fast Track (3 Steps)

### 1️⃣ Install Python Dependencies

Open PowerShell and run:

```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"
pip install -r requirements.txt
```

### 2️⃣ Convert Excel to JSON

```powershell
python excel_to_json.py
```

You should see:
```
✓ Successfully converted XXXX records to JSON
✓ Output file: C:\Users\YourName\Disney\entitlements-dashboard\data\entitlements.json
```

### 3️⃣ Start the Dashboard

```powershell
cd ..\dashboard
python -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

🎉 **Done!** Your dashboard is now running!

---

## 📊 What You'll See

### Top Section - KPI Cards
- **Total Records**: Count of all entitlements
- **Total Quantity**: Sum of all license quantities
- **Unique Brands**: Number of different brands
- **Unique Customers**: Number of different customers

### Filters
Use the filter section to narrow down data:
- Select a **Brand** from dropdown
- Select a **Region** from dropdown
- Type to search **Customer** names
- Type to search **Product** names

### Charts
Four interactive visualizations:
1. **Brand Distribution** - Bar chart of quantities by brand
2. **Top 10 Products** - Horizontal bar chart
3. **Regional Distribution** - Pie chart
4. **Support Level Distribution** - Doughnut chart

### Business Opportunities
Three key metrics:
- **Licenses Without S&S** - Upsell opportunities
- **S&S Expiring Soon** - Renewal opportunities (90 days)
- **High Deployment Ratio** - Expansion opportunities

### Data Table
- Sortable columns (click headers)
- Shows first 50 rows
- Click "Load More Rows" for additional data

---

## 🔄 Updating Data

When you get a new Excel file:

```powershell
# 1. Replace the Excel file (or update the path in the script)
# 2. Run the converter again
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"
python excel_to_json.py

# 3. Refresh your browser
# Press F5 or Ctrl+R
```

---

## 💾 Export Data

Click the **"Export Data"** button in the top-right corner to download:
- Current filtered dataset as CSV
- Opens in Excel
- Includes all columns

---

## 🎯 Common Tasks

### Find All Licenses for a Specific Brand

1. Select brand from **Brand Filter** dropdown
2. View updated charts and table
3. Click **Export Data** to save results

### Identify Renewal Opportunities

1. Look at **"S&S Expiring Soon"** card
2. Click to see which customers need attention
3. Sort table by **S&S End Date**

### Analyze Regional Performance

1. Check **Regional Distribution** pie chart
2. Select region from **Region Filter**
3. View brand and product breakdown for that region

### Find Top Customers

1. Sort table by **Quantity** column (click header)
2. View top customers by license count
3. Filter by brand or region for specific segments

---

## ⚠️ Troubleshooting

### "Loading..." Never Finishes

**Problem**: JSON file not found or CORS issue

**Solution**:
```powershell
# Make sure you're using Python's HTTP server
cd "C:\Users\YourName\Disney\entitlements-dashboard\dashboard"
python -m http.server 8000
```

Then use `http://localhost:8000` (not `file://`)

### Python Command Not Found

**Problem**: Python not installed or not in PATH

**Solution**:
1. Download Python from python.org
2. During installation, check "Add Python to PATH"
3. Restart PowerShell

### pip install fails

**Problem**: pip not available

**Solution**:
```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### Excel file not found

**Problem**: Wrong file path

**Solution**:
1. Open `scripts/excel_to_json.py` in a text editor
2. Update line 11 with correct path:
   ```python
   EXCEL_FILE = r"C:\Your\Actual\Path\To\File.xlsx"
   ```
3. Save and run again

---

## 🎓 Tips for Best Results

1. **Use Filters Together**: Combine brand + region for targeted analysis
2. **Export Filtered Data**: Get exactly the subset you need
3. **Sort Columns**: Click any column header to sort
4. **Refresh Regularly**: Update data weekly or when Excel changes
5. **Bookmark**: Save `http://localhost:8000` as a bookmark

---

## 📱 Mobile Access

The dashboard works on mobile devices:

1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. On your mobile device, open browser to:
   ```
   http://YOUR-IP-ADDRESS:8000
   ```
   (Replace YOUR-IP-ADDRESS with actual IP)

3. Make sure both devices are on the same network

---

## 🚀 Next Steps

Once comfortable with the basic dashboard:

1. **Explore Metabase** - See MIGRATION.md for advanced analytics
2. **Customize Visualizations** - Edit JavaScript files to add new charts
3. **Schedule Updates** - Create a batch file to automate data conversion
4. **Share with Team** - Run on a shared server for team access

---

## 📞 Need Help?

1. Check **README.md** for detailed documentation
2. Review **Troubleshooting** section above
3. Check browser console (F12) for error messages
4. Verify all files are in correct locations

---

## ✅ Checklist

Before asking for help, verify:

- [ ] Python is installed (`python --version`)
- [ ] Dependencies are installed (`pip list | findstr pandas`)
- [ ] Excel file exists at specified path
- [ ] JSON file was created in `data/` folder
- [ ] Using HTTP server (not opening file directly)
- [ ] Browser is modern (Chrome, Firefox, Edge)
- [ ] No firewall blocking localhost:8000

---

**Enjoy your dashboard! 📊✨**
