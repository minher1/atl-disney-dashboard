# 🎯 Disney Entitlements Dashboard

**Secure, password-protected dashboard for viewing Disney IBM entitlements data.**

---

## 🔐 Security Features

- ✅ **Password Protected** - Login required before access
- ✅ **Private Repository** - Code not publicly visible
- ✅ **Session Management** - 24-hour auto-logout
- ✅ **Secure Authentication** - SHA-256 password hashing
- ✅ **Manual Logout** - Logout button available

**Password:** `DisneyIBM2026!!`

---

## 📊 Features

### Data Visualization
- Interactive charts and graphs
- Real-time filtering
- Product categorization
- Status tracking (Installed Base, Opportunity, Explore, At Risk)

### Export Capabilities
- CSV export
- Filtered data export
- Full dataset download

### User Interface
- Responsive design (mobile-friendly)
- Bootstrap 5 styling
- Chart.js visualizations
- Intuitive navigation

---

## 🚀 Quick Start

### For Viewers (FML)

1. Go to: `https://YOUR-USERNAME.github.io/disney-entitlements-dashboard/login.html`
2. Enter password: `DisneyIBM2026!!`
3. View dashboard

See **SIMPLE-START-GUIDE.md** for detailed instructions.

### For Developers

1. Clone repository
2. Open `QUICK-START-GITHUB.md`
3. Follow deployment steps

---

## 📁 Project Structure

```
entitlements-dashboard/
├── login.html              # Password-protected entry point
├── dashboard/
│   ├── index.html         # Main dashboard
│   ├── auth-check.js      # Authentication verification
│   ├── css/
│   │   └── dashboard.css  # Custom styles
│   ├── js/
│   │   ├── dashboard.js   # Dashboard logic
│   │   └── data-loader.js # Data loading
│   └── data/
│       └── entitlements.json  # Entitlements data
├── scripts/
│   └── excel_to_json.py   # Data conversion script
└── docs/
    ├── QUICK-START-GITHUB.md    # Quick deployment guide
    ├── GITHUB-DEPLOYMENT.md     # Detailed deployment guide
    └── SIMPLE-START-GUIDE.md    # User guide for FML
```

---

## 🔄 Updating Data

### Manual Update

1. Update Excel file locally
2. Run conversion script:
   ```powershell
   python scripts/excel_to_json.py
   ```
3. Commit and push:
   ```powershell
   git add data/entitlements.json
   git commit -m "Update entitlements data"
   git push
   ```

### Automated Update

Use the provided PowerShell script:
```powershell
.\update-and-deploy.ps1
```

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Framework:** Bootstrap 5
- **Charts:** Chart.js 4.4.1
- **Authentication:** Client-side (SHA-256)
- **Hosting:** GitHub Pages
- **Version Control:** Git

---

## 📊 Data Sources

- Disney IBM entitlements data
- Product categorization mapping
- Status tracking information

**Note:** Sensitive financial data is excluded via `.gitignore`

---

## 🔒 Security Notes

### What's Protected:
- ✅ Repository is private
- ✅ Password required for access
- ✅ Session timeout after 24 hours
- ✅ Sensitive files excluded from repo

### What to Share:
- ✅ Dashboard URL
- ✅ Password (via secure channel)
- ✅ User guide

### What NOT to Share:
- ❌ GitHub repository link
- ❌ Source code access
- ❌ Raw data files

---

## 👥 Access Management

### Adding Viewers
Share the dashboard URL and password via secure channel (email, Teams, etc.)

### Adding Collaborators
1. Go to repository Settings
2. Click Collaborators
3. Add GitHub username
4. They'll receive invitation

---

## 🆘 Troubleshooting

### Login Issues
- Verify password is correct (case-sensitive)
- Clear browser cache
- Check browser console (F12) for errors

### Dashboard Not Loading
- Wait 2-3 minutes after deployment
- Verify GitHub Pages is enabled
- Check URL includes `/login.html`

### Data Not Displaying
- Verify JSON file is valid
- Check browser console for errors
- Ensure data file path is correct

---

## 📚 Documentation

- **QUICK-START-GITHUB.md** - 10-minute deployment guide
- **GITHUB-DEPLOYMENT.md** - Comprehensive deployment documentation
- **SIMPLE-START-GUIDE.md** - Non-technical user guide

---

## 🔄 Maintenance

### Weekly
- [ ] Verify dashboard functionality
- [ ] Check data currency
- [ ] Test login/logout

### Monthly
- [ ] Update entitlements data
- [ ] Review password security
- [ ] Check GitHub security alerts

---

## 📧 Support

For issues or questions:
1. Check documentation first
2. Review troubleshooting section
3. Contact repository maintainer

---

## 📝 License

**Internal Use Only** - IBM Confidential

This dashboard contains proprietary Disney and IBM data. Unauthorized access, use, or distribution is prohibited.

---

## 🎉 Quick Links

- **Dashboard:** `https://YOUR-USERNAME.github.io/disney-entitlements-dashboard/login.html`
- **Password:** `DisneyIBM2026!!`
- **Documentation:** See `/docs` folder
- **Support:** Contact maintainer

---

**Last Updated:** February 2026  
**Version:** 1.0.0  
**Maintained by:** Mike Arbrouet
