// Disney Enterprise Entitlements Dashboard - Utilities
// Helper functions and export capabilities

function exportToCSV() {
    if (filteredData.length === 0) {
        alert('No data to export');
        return;
    }
    
    // Get all column names from the first record
    const columns = Object.keys(filteredData[0]);
    
    // Create CSV header
    let csv = columns.map(col => `"${col}"`).join(',') + '\n';
    
    // Add data rows
    filteredData.forEach(row => {
        const values = columns.map(col => {
            let value = row[col];
            
            // Handle null/undefined
            if (value === null || value === undefined) {
                value = '';
            }
            
            // Convert to string and escape quotes
            value = String(value).replace(/"/g, '""');
            
            return `"${value}"`;
        });
        
        csv += values.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `disney_entitlements_${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Exported ${filteredData.length} records to ${filename}`);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced filter for text inputs
const debouncedFilter = debounce(applyFilters, 300);

// Update text input filters to use debounce
document.addEventListener('DOMContentLoaded', function() {
    const customerFilter = document.getElementById('customerFilter');
    const productFilter = document.getElementById('productFilter');
    
    if (customerFilter) {
        customerFilter.removeAttribute('onkeyup');
        customerFilter.addEventListener('keyup', debouncedFilter);
    }
    
    if (productFilter) {
        productFilter.removeAttribute('onkeyup');
        productFilter.addEventListener('keyup', debouncedFilter);
    }
});

function formatCurrency(value, currency = 'USD') {
    if (value === null || value === undefined || value === '') return '-';
    const num = parseFloat(value);
    if (isNaN(num)) return '-';
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(num);
}

function formatPercentage(value) {
    if (value === null || value === undefined || value === '') return '-';
    const num = parseFloat(value);
    if (isNaN(num)) return '-';
    
    return (num * 100).toFixed(1) + '%';
}

function getUniqueValues(data, field) {
    return [...new Set(data.map(row => row[field]).filter(Boolean))].sort();
}

function aggregateByField(data, field, valueField) {
    const result = {};
    
    data.forEach(row => {
        const key = row[field] || 'Unknown';
        const value = parseFloat(row[valueField]) || 0;
        result[key] = (result[key] || 0) + value;
    });
    
    return result;
}

function calculatePercentile(data, field, percentile) {
    const values = data
        .map(row => parseFloat(row[field]))
        .filter(val => !isNaN(val))
        .sort((a, b) => a - b);
    
    if (values.length === 0) return 0;
    
    const index = Math.ceil((percentile / 100) * values.length) - 1;
    return values[index];
}

function getTopN(data, field, n = 10) {
    const aggregated = aggregateByField(data, field, 'Software license or appliance quantity');
    
    return Object.entries(aggregated)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

// Performance monitoring
if (window.performance && window.performance.mark) {
    window.addEventListener('load', function() {
        window.performance.mark('dashboard-loaded');
        
        const perfData = window.performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Dashboard Performance:');
            console.log(`- DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
            console.log(`- Page Load: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }
    });
}

// Made with Bob
