// Disney Enterprise Entitlements Dashboard - Filters
// Handles all filtering functionality

function applyFilters() {
    const brandFilter = document.getElementById('brandFilter').value.toLowerCase();
    const regionFilter = document.getElementById('regionFilter').value.toLowerCase();
    const customerFilter = document.getElementById('customerFilter').value.toLowerCase();
    const productFilter = document.getElementById('productFilter').value.toLowerCase();
    
    // Filter data
    filteredData = rawData.filter(row => {
        // Brand filter
        if (brandFilter && (!row.Brand || row.Brand.toLowerCase() !== brandFilter)) {
            return false;
        }
        
        // Region filter
        if (regionFilter && (!row['CRM region'] || row['CRM region'].toLowerCase() !== regionFilter)) {
            return false;
        }
        
        // Customer filter (partial match)
        if (customerFilter && (!row['Customer name'] ||
            !row['Customer name'].toLowerCase().includes(customerFilter))) {
            return false;
        }
        
        // Product filter (partial match)
        if (productFilter && (!row['Current product'] ||
            !row['Current product'].toLowerCase().includes(productFilter))) {
            return false;
        }
        
        return true;
    });
    
    // Reset displayed rows
    displayedRows = 50;
    
    // Update all components
    updateKPIs();
    updateCharts();
    populateTable();
    populateBrandCustomerTable();
    calculateOpportunities();
    
    // Update filter status
    updateFilterStatus();
}

function resetFilters() {
    // Clear all filter inputs
    document.getElementById('brandFilter').value = '';
    document.getElementById('regionFilter').value = '';
    document.getElementById('customerFilter').value = '';
    document.getElementById('productFilter').value = '';
    
    // Reset filtered data
    filteredData = [...rawData];
    displayedRows = 50;
    
    // Update all components
    updateKPIs();
    updateCharts();
    populateTable();
    populateBrandCustomerTable();
    calculateOpportunities();
    
    // Clear filter status
    document.getElementById('filterStatus').textContent = '';
}

function updateFilterStatus() {
    const totalRecords = rawData.length;
    const filteredRecords = filteredData.length;
    
    if (filteredRecords === totalRecords) {
        document.getElementById('filterStatus').textContent = '';
    } else {
        const percentage = ((filteredRecords / totalRecords) * 100).toFixed(1);
        document.getElementById('filterStatus').textContent = 
            `Filtered: ${filteredRecords.toLocaleString()} of ${totalRecords.toLocaleString()} records (${percentage}%)`;
    }
}

// Made with Bob
