# Metabase Migration Guide

This guide explains how to migrate from the HTML dashboard to Metabase for more advanced analytics capabilities.

## Why Migrate to Metabase?

### HTML Dashboard (Current)
✅ Simple and fast  
✅ No installation required  
✅ Works offline  
✅ Easy to share  
❌ Limited to predefined visualizations  
❌ Single user only  
❌ No scheduled reports  
❌ No advanced SQL queries  

### Metabase (Advanced)
✅ Unlimited custom queries  
✅ Multi-user access with permissions  
✅ Scheduled email reports  
✅ Advanced filtering and drill-down  
✅ SQL query builder  
✅ Dashboard sharing and embedding  
✅ Data refresh automation  
❌ Requires Docker installation  
❌ More complex setup  

## Prerequisites

- Docker Desktop installed and running
- SQLite database created (run `excel_to_sqlite.py`)
- At least 2GB free RAM
- Port 3000 available

## Migration Steps

### Step 1: Create SQLite Database

If you haven't already, convert your Excel file to SQLite:

```powershell
cd "C:\Users\MikeArbrouet\Disney\entitlements-dashboard\scripts"
python excel_to_sqlite.py
```

This creates `data/entitlements.db` with indexed tables for fast queries.

### Step 2: Start Metabase

```powershell
cd "C:\Users\MikeArbrouet\Disney\entitlements-dashboard\metabase"
docker-compose up -d
```

Wait 1-2 minutes for Metabase to initialize.

### Step 3: Initial Setup

1. Open browser to `http://localhost:3000`
2. Click "Let's get started"
3. Create admin account:
   - **Email**: your-email@example.com
   - **Password**: (choose a secure password)
   - **First name**: Your name
   - **Company**: Disney

### Step 4: Add Database Connection

1. Click "Add a database"
2. Select **SQLite** as database type
3. Configure connection:
   - **Display name**: Disney Entitlements
   - **Database file**: `/data/entitlements.db`
4. Click "Save"
5. Wait for Metabase to scan the database

### Step 5: Explore Your Data

1. Click "Browse data"
2. Select "Disney Entitlements"
3. Click on "entitlements" table
4. You'll see all your data with automatic visualizations

## Creating Your First Dashboard

### Dashboard 1: Executive Summary

1. Click "New" → "Dashboard"
2. Name it "Executive Summary"
3. Add these questions:

**Total Records Card**
- Click "Add a question"
- Simple question → entitlements table
- Summarize: Count
- Visualization: Number

**Total Quantity Card**
- Simple question → entitlements table
- Summarize: Sum of Software_license_or_appliance_quantity
- Visualization: Number

**Brand Distribution**
- Simple question → entitlements table
- Summarize: Sum of Software_license_or_appliance_quantity
- Group by: Brand
- Visualization: Bar chart

**Regional Distribution**
- Simple question → entitlements table
- Summarize: Sum of Software_license_or_appliance_quantity
- Group by: CRM_region
- Visualization: Pie chart

### Dashboard 2: Business Opportunities

**Licenses Without S&S**
```sql
SELECT 
    Customer_name,
    Brand,
    Current_product,
    Software_license_or_appliance_quantity,
    Active_SandS_quantity
FROM entitlements
WHERE Software_license_or_appliance_quantity > 0
  AND (Active_SandS_quantity = 0 OR Active_SandS_quantity IS NULL)
ORDER BY Software_license_or_appliance_quantity DESC
```

**Expiring S&S (Next 90 Days)**
```sql
SELECT 
    Customer_name,
    Brand,
    Current_product,
    Active_SandS_quantity,
    Active_SandS_end_date,
    CAST((julianday(Active_SandS_end_date) - julianday('now')) AS INTEGER) as days_until_expiry
FROM entitlements
WHERE Active_SandS_end_date IS NOT NULL
  AND Active_SandS_end_date >= date('now')
  AND Active_SandS_end_date <= date('now', '+90 days')
ORDER BY Active_SandS_end_date
```

**High Deployment Ratio**
```sql
SELECT 
    Customer_name,
    Brand,
    Current_product,
    Software_license_or_appliance_quantity as licensed,
    Deployed_quantity as deployed,
    ROUND(CAST(Deployed_quantity AS FLOAT) / Software_license_or_appliance_quantity * 100, 1) as deployment_percentage
FROM entitlements
WHERE Software_license_or_appliance_quantity > 0
  AND Deployed_quantity > 0
  AND CAST(Deployed_quantity AS FLOAT) / Software_license_or_appliance_quantity > 0.8
ORDER BY deployment_percentage DESC
```

### Dashboard 3: Product Analysis

**Top 10 Products**
```sql
SELECT 
    Current_product,
    COUNT(*) as customer_count,
    SUM(Software_license_or_appliance_quantity) as total_quantity,
    AVG(Software_license_or_appliance_quantity) as avg_quantity
FROM entitlements
WHERE Current_product IS NOT NULL
GROUP BY Current_product
ORDER BY total_quantity DESC
LIMIT 10
```

**Support Level Distribution**
```sql
SELECT 
    'Active S&S' as support_type,
    SUM(Active_SandS_quantity) as quantity
FROM entitlements
UNION ALL
SELECT 
    'Sustained Support',
    SUM(Sustained_Support)
FROM entitlements
UNION ALL
SELECT 
    'Extended Support',
    SUM(Extended_Support)
FROM entitlements
UNION ALL
SELECT 
    'Advanced Support',
    SUM(Advanced_Support)
FROM entitlements
```

## Advanced Features

### Scheduled Reports

1. Open any dashboard
2. Click the sharing icon
3. Select "Send this dashboard"
4. Configure:
   - **Recipients**: email addresses
   - **Frequency**: Daily, Weekly, or Monthly
   - **Time**: When to send
5. Click "Done"

### Filters

Add dashboard-level filters:

1. Edit dashboard
2. Click "Add a filter"
3. Select filter type:
   - **Text**: For customer names, products
   - **Date**: For S&S end dates
   - **Number**: For quantities
4. Connect filter to questions
5. Save dashboard

### Drill-Through

Enable clicking on charts to see details:

1. Edit question
2. Click on visualization settings
3. Enable "Click behavior"
4. Configure what happens on click:
   - Go to another dashboard
   - Show detailed records
   - Filter other questions

### User Management

Add team members:

1. Click settings (gear icon)
2. Select "Admin" → "People"
3. Click "Invite someone"
4. Enter email and select role:
   - **Admin**: Full access
   - **Analyst**: Can create queries
   - **Viewer**: Read-only access

### Collections

Organize dashboards and questions:

1. Click "New" → "Collection"
2. Name it (e.g., "Sales Team", "Executive")
3. Set permissions
4. Move dashboards into collections

## Data Refresh

### Manual Refresh

1. Open any question or dashboard
2. Click the refresh icon
3. Data updates immediately

### Automatic Refresh

Metabase automatically syncs database schema daily. To refresh data:

1. Re-run `excel_to_sqlite.py` when Excel file updates
2. Metabase will see new data immediately
3. No need to restart Metabase

### Scheduled Sync

1. Go to Admin → Databases
2. Click on "Disney Entitlements"
3. Scroll to "Database syncing"
4. Configure:
   - **Scan frequency**: How often to check for schema changes
   - **Cache TTL**: How long to cache query results

## Performance Optimization

### Add Indexes

The conversion script already adds indexes for common fields. To add more:

```sql
CREATE INDEX idx_product ON entitlements(Current_product);
CREATE INDEX idx_end_date ON entitlements(Active_SandS_end_date);
```

### Query Optimization

- Use filters to reduce data volume
- Avoid `SELECT *` in custom queries
- Use aggregations instead of returning all rows
- Cache frequently-used queries

### Dashboard Performance

- Limit number of questions per dashboard (max 10-12)
- Use dashboard filters instead of question filters
- Enable caching for slow queries
- Consider creating summary tables for complex aggregations

## Backup and Restore

### Backup Metabase Data

```powershell
docker-compose exec metabase tar czf /tmp/metabase-backup.tar.gz /metabase-data
docker cp disney-entitlements-metabase:/tmp/metabase-backup.tar.gz ./metabase-backup.tar.gz
```

### Restore Metabase Data

```powershell
docker cp ./metabase-backup.tar.gz disney-entitlements-metabase:/tmp/
docker-compose exec metabase tar xzf /tmp/metabase-backup.tar.gz -C /
docker-compose restart
```

## Troubleshooting

### Metabase won't start

**Check Docker**:
```powershell
docker ps
docker logs disney-entitlements-metabase
```

**Common issues**:
- Port 3000 already in use
- Not enough memory
- Docker Desktop not running

### Can't connect to database

**Verify database file**:
```powershell
ls ../data/entitlements.db
```

**Check permissions**:
- Ensure database file is readable
- Verify path in docker-compose.yml

### Slow queries

**Solutions**:
- Add indexes to frequently queried columns
- Use filters to reduce data volume
- Enable query caching
- Increase Docker memory allocation

## Comparison: HTML vs Metabase

| Feature | HTML Dashboard | Metabase |
|---------|---------------|----------|
| Setup Time | 5 minutes | 15 minutes |
| Learning Curve | Easy | Moderate |
| Customization | Limited | Unlimited |
| Multi-user | No | Yes |
| Scheduled Reports | No | Yes |
| SQL Queries | No | Yes |
| Mobile Friendly | Yes | Yes |
| Offline Access | Yes | No |
| Cost | Free | Free |

## Best Practices

1. **Start Simple**: Begin with the HTML dashboard, migrate when you need advanced features
2. **Regular Backups**: Backup Metabase data weekly
3. **User Training**: Train team members on Metabase basics
4. **Documentation**: Document custom queries and dashboards
5. **Performance**: Monitor query performance and optimize slow queries
6. **Security**: Use strong passwords and appropriate user permissions
7. **Updates**: Keep Metabase updated for security and features

## Next Steps

After migration:

1. ✅ Create executive summary dashboard
2. ✅ Set up business opportunity alerts
3. ✅ Schedule weekly reports
4. ✅ Add team members
5. ✅ Create custom queries for specific needs
6. ✅ Set up automated data refresh
7. ✅ Train team on Metabase usage

## Support Resources

- **Metabase Documentation**: https://www.metabase.com/docs/
- **Metabase Community**: https://discourse.metabase.com/
- **SQL Tutorial**: https://www.w3schools.com/sql/

---

**Remember**: You can use both the HTML dashboard and Metabase simultaneously. The HTML dashboard is great for quick checks, while Metabase is better for deep analysis and collaboration.