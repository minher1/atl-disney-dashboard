# Disney Enterprise Entitlements Dashboard

An interactive web-based dashboard for analyzing Disney Enterprise Entitlements by Customer Site. This solution provides powerful visualizations and filtering capabilities to identify business opportunities, track renewals, and analyze product distribution.

## 🎯 Features

### Interactive Visualizations
- **Brand Distribution Analysis** - Bar chart showing total quantity by brand
- **Top Products** - Horizontal bar chart of top 10 products by quantity
- **Regional Distribution** - Pie chart showing geographic distribution
- **Support Level Analysis** - Doughnut chart of support coverage

### Business Intelligence
- **Upsell Opportunities** - Identify licenses without S&S coverage
- **Renewal Tracking** - Monitor S&S expirations in the next 90 days
- **Expansion Opportunities** - Find customers with high deployment ratios

### Data Manipulation
- **Multi-level Filtering** - Filter by brand, region, customer, and product
- **Sortable Tables** - Click column headers to sort data
- **Search Functionality** - Quick search across customers and products
- **CSV Export** - Export filtered data for further analysis

### Key Performance Indicators
- Total records count
- Total quantity across all products
- Unique brands and customers
- Real-time filtering statistics

## 📁 Project Structure

```
entitlements-dashboard/
├── data/
│   ├── entitlements.json          # JSON data for HTML dashboard
│   └── entitlements.db            # SQLite database for Metabase
├── scripts/
│   ├── requirements.txt           # Python dependencies
│   ├── excel_to_json.py          # Excel to JSON converter
│   └── excel_to_sqlite.py        # Excel to SQLite converter
├── dashboard/
│   ├── index.html                # Main dashboard page
│   ├── css/
│   │   └── dashboard.css         # Custom styles
│   └── js/
│       ├── data-loader.js        # Data loading and parsing
│       ├── charts.js             # Chart creation and updates
│       ├── filters.js            # Filtering functionality
│       └── utils.js              # Utilities and export
├── metabase/
│   └── docker-compose.yml        # Metabase Docker setup
└── README.md                     # This file
```

## 🚀 Quick Start

### Step 1: Install Python Dependencies

Open PowerShell in the `scripts` folder:

```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"
pip install -r requirements.txt
```

### Step 2: Convert Excel to JSON

Run the conversion script:

```powershell
python excel_to_json.py
```

This will:
- Read your Excel file from: `C:\Users\YourName\Desktop\Disney\Disney_Enterprise__Entitlements_by_Customer_Site_v3.xlsx`
- Create: `data/entitlements.json`
- Display summary statistics

### Step 3: Open the Dashboard

**Option A: Using Python's Built-in Server (Recommended)**

```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\dashboard"
python -m http.server 8000
```

Then open your browser to: `http://localhost:8000`

**Option B: Using VS Code Live Server**

1. Install "Live Server" extension in VS Code
2. Right-click `dashboard/index.html`
3. Select "Open with Live Server"

**Option C: Direct File Access (Limited)**

Simply open `dashboard/index.html` in your browser. Note: Some browsers may block loading JSON files from the file system due to CORS restrictions.

## 📊 Using the Dashboard

### Filters

1. **Brand Filter** - Select a specific brand from the dropdown
2. **Region Filter** - Filter by CRM region
3. **Customer Search** - Type to search customer names (partial match)
4. **Product Search** - Type to search product names (partial match)

Click "Reset Filters" to clear all filters and show all data.

### Charts

All charts update automatically when filters are applied:

- **Click and drag** to zoom in on charts (where supported)
- **Hover** over chart elements to see detailed tooltips
- Charts show the top 10 items by default for better readability

### Data Table

- **Click column headers** to sort ascending/descending
- **Load More Rows** button shows additional records (50 at a time)
- Table shows 6 key columns for quick reference

### Export Data

Click the "Export Data" button in the top-right to download:
- Current filtered dataset as CSV
- All columns included
- Filename includes timestamp

## 🔄 Updating Data

When you receive a new Excel file:

1. Replace the Excel file at the configured location
2. Run the conversion script again:
   ```powershell
   python scripts/excel_to_json.py
   ```
3. Refresh your browser to see updated data

## 🐳 Advanced: Metabase Setup (Optional)

For more advanced analytics and multi-user access, you can use Metabase:

### Step 1: Create SQLite Database

```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\scripts"
python excel_to_sqlite.py
```

### Step 2: Start Metabase

```powershell
cd "C:\Users\YourName\Disney\entitlements-dashboard\metabase"
docker-compose up -d
```

### Step 3: Configure Metabase

1. Wait 1-2 minutes for Metabase to start
2. Open browser to: `http://localhost:3000`
3. Complete the initial setup wizard
4. Add database connection:
   - **Database type**: SQLite
   - **Database file**: `/data/entitlements.db`
   - **Name**: Disney Entitlements

### Step 4: Create Dashboards

Metabase provides:
- Drag-and-drop query builder
- Advanced SQL queries
- Scheduled reports via email
- User access control
- Dashboard sharing

### Stop Metabase

```powershell
docker-compose down
```

## 📈 Dashboard Insights

### Business Opportunities Panel

**Licenses Without S&S**
- Shows count of licenses that don't have S&S coverage
- Represents potential upsell opportunities
- Click to see detailed list of affected customers

**S&S Expiring Soon**
- Counts S&S agreements expiring in next 90 days
- Critical for renewal planning
- Proactive customer engagement opportunity

**High Deployment Ratio**
- Identifies customers using >80% of licensed capacity
- Indicates potential need for additional licenses
- Expansion opportunity indicator

## 🛠️ Troubleshooting

### Dashboard shows "Loading..." forever

**Cause**: JSON file not found or CORS issue

**Solution**:
1. Verify `data/entitlements.json` exists
2. Use Python's HTTP server instead of opening file directly
3. Check browser console (F12) for error messages

### Charts not displaying

**Cause**: Chart.js library not loading

**Solution**:
1. Check internet connection (CDN resources required)
2. Clear browser cache
3. Try a different browser

### Python script fails

**Cause**: Missing dependencies or wrong file path

**Solution**:
1. Ensure pandas and openpyxl are installed: `pip install -r requirements.txt`
2. Verify Excel file path in the script
3. Check Python version (3.7+ required)

### Export button not working

**Cause**: Browser blocking downloads

**Solution**:
1. Check browser's download settings
2. Allow downloads from localhost
3. Try a different browser

## 📝 Data Fields

The dashboard uses these key fields from your Excel file:

- **Program** - Program identifier
- **Agreement number** - Contract reference
- **Site number** - Customer site ID
- **Customer name** - Customer organization name
- **Brand** - Product brand
- **Current product** - Product name
- **Software license or appliance quantity** - Total licenses
- **Active S&S quantity** - Active support quantity
- **Active S&S end date** - Support expiration date
- **CRM region** - Geographic region
- **Deployed quantity** - Currently deployed licenses
- **Sustained Support** - Sustained support level quantity
- **Extended Support** - Extended support level quantity
- **Advanced Support** - Advanced support level quantity

## 🔐 Security Notes

- This dashboard runs locally on your machine
- No data is sent to external servers
- All processing happens in your browser
- Excel file remains on your local drive
- Metabase (if used) also runs locally via Docker

## 💡 Tips & Best Practices

1. **Regular Updates**: Run the conversion script weekly or when data changes
2. **Filter Combinations**: Use multiple filters together for deeper insights
3. **Export Filtered Data**: Export specific subsets for targeted analysis
4. **Browser Bookmarks**: Bookmark `http://localhost:8000` for quick access
5. **Performance**: For large datasets (>10,000 records), use filters to improve performance

## 🆘 Support

For issues or questions:

1. Check the Troubleshooting section above
2. Review browser console for error messages (F12)
3. Verify all files are in the correct locations
4. Ensure Python dependencies are installed

## 📄 License

This dashboard is created for internal use with Disney Enterprise Entitlements data.

## 🔄 Version History

- **v1.0** (2026-01-28)
  - Initial release
  - HTML/JavaScript dashboard
  - Python conversion scripts
  - Metabase integration support
  - Interactive filtering and charts
  - CSV export functionality

---

**Created by**: Bob (AI Assistant)  
**Date**: January 28, 2026  
**Technology Stack**: HTML5, CSS3, JavaScript, Chart.js, Bootstrap 5, Python, Pandas
