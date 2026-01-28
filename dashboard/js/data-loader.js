// Disney Enterprise Entitlements Dashboard - Data Loader
// Handles loading and parsing of JSON data

let rawData = [];
let filteredData = [];
let currentSortColumn = null;
let currentSortDirection = 'asc';
let displayedRows = 50;

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

async function loadData() {
    try {
        console.log('Loading entitlements data...');
        
        // Load JSON data
        const response = await fetch('../data/entitlements.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        
        // Extract data array
        rawData = jsonData.data || [];
        filteredData = [...rawData];
        
        console.log(`Loaded ${rawData.length} records`);
        
        // Hide loading indicator
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('dashboardContent').style.display = 'block';
        
        // Initialize dashboard
        initializeDashboard();
        
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('loadingIndicator').innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error Loading Data</h4>
                <p>Failed to load entitlements data. Please ensure:</p>
                <ul>
                    <li>You have run the Python script to convert Excel to JSON</li>
                    <li>The file <code>data/entitlements.json</code> exists</li>
                    <li>You are opening this file via a web server (not file://)</li>
                </ul>
                <hr>
                <p class="mb-0"><strong>Error details:</strong> ${error.message}</p>
                <hr>
                <p class="mb-0"><strong>Quick Start:</strong></p>
                <ol>
                    <li>Open PowerShell in the scripts folder</li>
                    <li>Run: <code>pip install -r requirements.txt</code></li>
                    <li>Run: <code>python excel_to_json.py</code></li>
                    <li>Refresh this page</li>
                </ol>
            </div>
        `;
    }
}

function initializeDashboard() {
    console.log('Initializing dashboard...');
    
    // Populate filter dropdowns
    populateFilters();
    
    // Update KPIs
    updateKPIs();
    
    // Create charts
    createCharts();
    
    // Populate data table
    populateTable();
    
    // Populate brand/customer table
    populateBrandCustomerTable();
    
    // Calculate business opportunities
    calculateOpportunities();
    
    console.log('Dashboard initialized successfully');
}

function populateFilters() {
    // Get unique values for filters
    const brands = [...new Set(rawData.map(row => row.Brand).filter(Boolean))].sort();
    const regions = [...new Set(rawData.map(row => row['CRM region']).filter(Boolean))].sort();
    
    // Populate brand filter
    const brandFilter = document.getElementById('brandFilter');
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
    
    // Populate region filter
    const regionFilter = document.getElementById('regionFilter');
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });
}

function updateKPIs() {
    const data = filteredData;
    
    // Total records
    document.getElementById('kpiTotalRecords').textContent = data.length.toLocaleString();
    
    // Total quantity (sum of software license quantities)
    const totalQuantity = data.reduce((sum, row) => {
        const qty = parseFloat(row['Software license or appliance quantity']) || 0;
        return sum + qty;
    }, 0);
    document.getElementById('kpiTotalQuantity').textContent = totalQuantity.toLocaleString();
    
    // Unique brands
    const uniqueBrands = new Set(data.map(row => row.Brand).filter(Boolean));
    document.getElementById('kpiUniqueBrands').textContent = uniqueBrands.size.toLocaleString();
    
    // Unique customers
    const uniqueCustomers = new Set(data.map(row => row['Customer name']).filter(Boolean));
    document.getElementById('kpiUniqueCustomers').textContent = uniqueCustomers.size.toLocaleString();
    
    // Update record count in navbar
    document.getElementById('recordCount').textContent = 
        `${data.length.toLocaleString()} of ${rawData.length.toLocaleString()} records`;
}

function populateTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    const data = filteredData.slice(0, displayedRows);
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.Brand || '-'}</td>
            <td>${row['Customer name'] || '-'}</td>
            <td>${row['Current product'] || '-'}</td>
            <td class="text-end">${formatNumber(row['Software license or appliance quantity'])}</td>
            <td>${row['CRM region'] || '-'}</td>
            <td>${formatDate(row['Active S&S end date'])}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Update table status
    const status = `Showing ${Math.min(displayedRows, filteredData.length)} of ${filteredData.length} records`;
    document.getElementById('tableStatus').textContent = status;
}

function loadMoreRows() {
    displayedRows += 50;
    populateTable();
}

function calculateOpportunities() {
    const data = filteredData;
    
    // Licenses without S&S coverage
    const noSS = data.filter(row => {
        const licQty = parseFloat(row['Software license or appliance quantity']) || 0;
        const ssQty = parseFloat(row['Active S&S quantity']) || 0;
        return licQty > 0 && ssQty === 0;
    }).length;
    document.getElementById('oppNoSS').textContent = noSS.toLocaleString();
    
    // S&S expiring in next 90 days
    const today = new Date();
    const ninetyDaysFromNow = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000));
    
    const expiringSoon = data.filter(row => {
        const endDate = row['Active S&S end date'];
        if (!endDate) return false;
        const date = new Date(endDate);
        return date >= today && date <= ninetyDaysFromNow;
    }).length;
    document.getElementById('oppExpiring').textContent = expiringSoon.toLocaleString();
    
    // High deployment ratio (deployed > 80% of licensed)
    const highDeployment = data.filter(row => {
        const deployed = parseFloat(row['Deployed quantity']) || 0;
        const licensed = parseFloat(row['Software license or appliance quantity']) || 0;
        return licensed > 0 && (deployed / licensed) > 0.8;
    }).length;
    document.getElementById('oppExpansion').textContent = highDeployment.toLocaleString();
}

function formatNumber(value) {
    if (value === null || value === undefined || value === '') return '-';
    const num = parseFloat(value);
    return isNaN(num) ? '-' : num.toLocaleString();
}

function formatDate(value) {
    if (!value) return '-';
    try {
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } catch (e) {
        return value;
    }
}

function sortTable(column) {
    if (currentSortColumn === column) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }
    
    filteredData.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        // Handle null/undefined
        if (aVal === null || aVal === undefined) aVal = '';
        if (bVal === null || bVal === undefined) bVal = '';
        
        // Try to parse as number
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return currentSortDirection === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // String comparison
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (currentSortDirection === 'asc') {
            return aStr.localeCompare(bStr);
        } else {
            return bStr.localeCompare(aStr);
        }
    });
    
    displayedRows = 50;
    populateTable();
}

// Made with Bob

// Brand & Customer Product Table
let brandCustomerData = [];
let brandCustomerSortColumn = null;
let brandCustomerSortDirection = 'asc';

function populateBrandCustomerTable() {
    // Prepare data: filter for records with Active S&S quantity > 0
    brandCustomerData = filteredData
        .filter(row => {
            const qty = parseFloat(row['Active S&S quantity']) || 0;
            return qty > 0;
        })
        .map(row => ({
            brand: row.Brand || '-',
            customer: row['Customer name'] || '-',
            product: row['Current product'] || '-',
            quantity: parseFloat(row['Active S&S quantity']) || 0,
            endDate: row['Active S&S end date'] || '-'
        }));
    
    renderBrandCustomerTable();
}

function renderBrandCustomerTable() {
    const tbody = document.getElementById('brandCustomerTableBody');
    tbody.innerHTML = '';
    
    if (brandCustomerData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No active S&S records found</td></tr>';
        document.getElementById('brandCustomerStatus').textContent = 'No records to display';
        return;
    }
    
    brandCustomerData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.brand}</td>
            <td>${row.customer}</td>
            <td>${row.product}</td>
            <td class="text-end">${row.quantity.toLocaleString()}</td>
            <td>${formatDate(row.endDate)}</td>
        `;
        tbody.appendChild(tr);
    });
    
    document.getElementById('brandCustomerStatus').textContent = 
        `Showing ${brandCustomerData.length} active S&S records`;
}

function sortBrandCustomerTable(column) {
    if (brandCustomerSortColumn === column) {
        brandCustomerSortDirection = brandCustomerSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        brandCustomerSortColumn = column;
        brandCustomerSortDirection = 'asc';
    }
    
    brandCustomerData.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        // Handle null/undefined
        if (aVal === null || aVal === undefined) aVal = '';
        if (bVal === null || bVal === undefined) bVal = '';
        
        // Numeric comparison for quantity
        if (column === 'quantity') {
            return brandCustomerSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        // String comparison
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (brandCustomerSortDirection === 'asc') {
            return aStr.localeCompare(bStr);
        } else {
            return bStr.localeCompare(aStr);
        }
    });
    
    renderBrandCustomerTable();
}

function filterBrandCustomerTable() {
    const searchTerm = document.getElementById('brandCustomerSearch').value.toLowerCase();
    
    if (!searchTerm) {
        populateBrandCustomerTable();
        return;
    }
    
    brandCustomerData = filteredData
        .filter(row => {
            const qty = parseFloat(row['Active S&S quantity']) || 0;
            if (qty === 0) return false;
            
            const brand = (row.Brand || '').toLowerCase();
            const customer = (row['Customer name'] || '').toLowerCase();
            const product = (row['Current product'] || '').toLowerCase();
            
            return brand.includes(searchTerm) || 
                   customer.includes(searchTerm) || 
                   product.includes(searchTerm);
        })
        .map(row => ({
            brand: row.Brand || '-',
            customer: row['Customer name'] || '-',
            product: row['Current product'] || '-',
            quantity: parseFloat(row['Active S&S quantity']) || 0,
            endDate: row['Active S&S end date'] || '-'
        }));
    
    renderBrandCustomerTable();
}

function exportBrandCustomerData() {
    if (brandCustomerData.length === 0) {
        alert('No data to export');
        return;
    }
    
    // Create CSV
    let csv = '"Brand","Customer","Current Product","Active S&S Quantity","S&S End Date"\n';
    
    brandCustomerData.forEach(row => {
        csv += `"${row.brand}","${row.customer}","${row.product}",${row.quantity},"${row.endDate}"\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `brand_customer_products_${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
