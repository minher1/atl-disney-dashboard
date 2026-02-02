// Utility functions for IBM Book of Business Dashboard

/**
 * Format number as currency
 */
function formatCurrency(value) {
    if (value === null || value === undefined || isNaN(value)) {
        return '$0.00';
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

/**
 * Format number as percentage
 */
function formatPercentage(value) {
    if (value === null || value === undefined || isNaN(value)) {
        return '0.00%';
    }
    return (value * 100).toFixed(2) + '%';
}

/**
 * Format date string
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'N/A';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    } catch (e) {
        return 'N/A';
    }
}

/**
 * Format large numbers with abbreviations (K, M, B)
 */
function formatNumber(value) {
    if (value === null || value === undefined || isNaN(value)) {
        return '0';
    }
    
    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(2) + 'B';
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + 'K';
    }
    return value.toFixed(0);
}

/**
 * Debounce function for search inputs
 */
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

/**
 * Group array of objects by key
 */
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key] || 'Unknown';
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

/**
 * Sum values in array by key
 */
function sumBy(array, key) {
    return array.reduce((sum, item) => {
        const value = parseFloat(item[key]) || 0;
        return sum + value;
    }, 0);
}

/**
 * Count unique values in array by key
 */
function countUnique(array, key) {
    const unique = new Set(array.map(item => item[key]));
    return unique.size;
}

/**
 * Sort array of objects by key
 */
function sortBy(array, key, descending = false) {
    return [...array].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        
        if (typeof aVal === 'string') {
            return descending 
                ? bVal.localeCompare(aVal)
                : aVal.localeCompare(bVal);
        }
        
        return descending ? bVal - aVal : aVal - bVal;
    });
}

/**
 * Export data to CSV
 */
function exportToCSV(data, filename = 'export.csv') {
    if (!data || data.length === 0) {
        console.error('No data to export');
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => 
            headers.map(header => {
                const value = row[header];
                // Escape quotes and wrap in quotes if contains comma
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Show loading overlay
 */
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
    }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

/**
 * Show error message
 */
function showError(message) {
    console.error(message);
    alert(`Error: ${message}`);
}

/**
 * Calculate date range from array of dates
 */
function getDateRange(dates) {
    const validDates = dates
        .filter(d => d)
        .map(d => new Date(d))
        .filter(d => !isNaN(d.getTime()));
    
    if (validDates.length === 0) {
        return 'N/A';
    }
    
    const minDate = new Date(Math.min(...validDates));
    const maxDate = new Date(Math.max(...validDates));
    
    return `${formatDate(minDate)} to ${formatDate(maxDate)}`;
}

/**
 * Filter array by search term across multiple fields
 */
function searchFilter(array, searchTerm, fields) {
    if (!searchTerm) return array;
    
    const term = searchTerm.toLowerCase();
    return array.filter(item => 
        fields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(term);
        })
    );
}

/**
 * Get top N items from array by key
 */
function getTopN(array, key, n = 10) {
    return sortBy(array, key, true).slice(0, n);
}

/**
 * Calculate percentage of total
 */
function percentageOfTotal(value, total) {
    if (!total || total === 0) return 0;
    return value / total;
}

/**
 * Generate color palette for charts
 */
function generateColorPalette(count) {
    const baseColors = [
        '#366092', // IBM Blue
        '#0f62fe', // Blue 60
        '#24a148', // Green 50
        '#f1c21b', // Yellow 30
        '#da1e28', // Red 50
        '#8a3ffc', // Purple 60
        '#ff7eb6', // Magenta 50
        '#fa4d56', // Red 40
        '#4589ff', // Blue 50
        '#08bdba', // Teal 50
    ];
    
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
}

/**
 * Safely parse JSON
 */
function safeJSONParse(jsonString, defaultValue = null) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('JSON parse error:', e);
        return defaultValue;
    }
}

// Made with Bob
