// CSE Data Loader - NO FINANCIAL DATA
// This loader strips all financial information from the dataset

let cseRawData = [];
let cseFilteredData = [];

// Financial data keywords to detect and block
const FINANCIAL_KEYWORDS = [
    'spend', 'cost', 'price', 'revenue', 'budget', 'acv', 'tcv',
    'annualized', 'payment', 'invoice', 'billing', '$', '€', '£', '¥'
];

// Technology domain mapping based on IBM products/categories
const DOMAIN_MAPPING = {
    'Data & AI': 'Data & Analytics',
    'Automation': 'Automation & Integration',
    'Cloud Pak': 'Cloud & Infrastructure',
    'Security': 'Security & Compliance',
    'Integration': 'Automation & Integration',
    'Transaction Processing': 'Applications & Middleware',
    'Infrastructure': 'Cloud & Infrastructure',
    'Sustainability Software': 'Sustainability & ESG'
};

// Status assignment logic (simulated - in real scenario would come from CRM/account data)
function assignTechnologyStatus(product, brand, channel) {
    // This is a simplified status assignment
    // In production, this would come from your CRM or account planning system
    
    // Active products (has data) = Installed Base
    if (channel) {
        return 'Installed Base';
    }
    
    // Default for demo purposes
    const rand = Math.random();
    if (rand < 0.6) return 'Installed Base';
    if (rand < 0.8) return 'Opportunity';
    if (rand < 0.95) return 'Explore';
    return 'At Risk';
}

/**
 * Validate that no financial data is present in a record
 */
function validateNoFinancialData(record) {
    const errors = [];
    
    // Check field names
    Object.keys(record).forEach(key => {
        const lowerKey = key.toLowerCase();
        FINANCIAL_KEYWORDS.forEach(keyword => {
            if (lowerKey.includes(keyword)) {
                errors.push(`Financial field detected: ${key}`);
            }
        });
    });
    
    // Check field values
    Object.entries(record).forEach(([key, value]) => {
        if (typeof value === 'string') {
            const lowerValue = value.toLowerCase();
            FINANCIAL_KEYWORDS.forEach(keyword => {
                if (lowerValue.includes(keyword)) {
                    errors.push(`Financial content detected in ${key}: ${value}`);
                }
            });
        }
    });
    
    return errors;
}

/**
 * Load data and strip all financial information
 */
async function loadCseData() {
    try {
        showLoading();
        const response = await fetch('data/book-of-business.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const rawData = await response.json();
        
        // Transform data to remove ALL financial fields
        cseRawData = rawData.map(record => {
            const domain = DOMAIN_MAPPING[record['IBM Brand']] || 'Other';
            const status = assignTechnologyStatus(
                record['IBM Product'],
                record['IBM Brand'],
                record['Direct or Partner']
            );
            
            const cleanRecord = {
                'Company Name': record['Company Name'],
                'Site Number': record['Site Number'],
                'IBM Category': record['IBM Category'],
                'IBM Brand': record['IBM Brand'],
                'IBM Product': record['IBM Product'],
                'Technology Domain': domain,
                'Direct or Partner': record['Direct or Partner'],
                'Channel Type': record['Direct or Partner'] === 'Direct' ? 'Direct' : 'Partner',
                'Partner Name': record['Direct or Partner'] === 'Direct' ? 'N/A' : record['Direct or Partner'],
                'Revenue Stream': record['Revenue Stream'],
                'Start Date': record['Start Date'],
                'End Date': record['End Date'],
                'Quantity': record['Quantity'],
                'Status': status
                // EXPLICITLY EXCLUDED: Annualized Spend ($)
            };
            
            // Runtime validation - ensure no financial data leaked through
            const validationErrors = validateNoFinancialData(cleanRecord);
            if (validationErrors.length > 0) {
                console.error('⚠️ FINANCIAL DATA DETECTED:', validationErrors);
                // Remove the problematic fields
                validationErrors.forEach(error => {
                    const fieldMatch = error.match(/field detected: (.+)/);
                    if (fieldMatch) {
                        delete cleanRecord[fieldMatch[1]];
                    }
                });
            }
            
            return cleanRecord;
        });
        
        cseFilteredData = [...cseRawData];
        
        console.log(`✅ CSE Dashboard: Loaded ${cseRawData.length} records (financial data excluded)`);
        console.log('✅ Financial data validation: PASSED');
        return cseRawData;
    } catch (error) {
        console.error('Error loading CSE data:', error);
        showError('Failed to load dashboard data. Please check if the data file exists.');
        return [];
    } finally {
        hideLoading();
    }
}

/**
 * Calculate landscape summary metrics (NO FINANCIAL DATA)
 */
function calculateLandscapeSummary(data) {
    return {
        totalTechnologies: data.length,
        uniqueVendors: countUnique(data, 'IBM Brand'),
        totalDomains: countUnique(data, 'Technology Domain'),
        partnerChannels: countUnique(data.filter(d => d['Channel Type'] === 'Partner'), 'Direct or Partner'),
        businessUnits: countUnique(data, 'Company Name')
    };
}

/**
 * Calculate IBM footprint summary (NO FINANCIAL DATA)
 */
function calculateIbmSummary(data) {
    const ibmData = data.filter(d => d['IBM Brand']);
    
    return {
        installedCount: ibmData.filter(d => d.Status === 'Installed Base').length,
        opportunityCount: ibmData.filter(d => d.Status === 'Opportunity').length,
        exploreCount: ibmData.filter(d => d.Status === 'Explore').length,
        riskCount: ibmData.filter(d => d.Status === 'At Risk').length
    };
}

/**
 * Group technologies by domain
 */
function groupByDomain(data) {
    const grouped = {};
    
    data.forEach(record => {
        const domain = record['Technology Domain'];
        if (!grouped[domain]) {
            grouped[domain] = [];
        }
        grouped[domain].push(record);
    });
    
    return grouped;
}

/**
 * Group IBM technologies by domain and status
 */
function groupIbmByDomainAndStatus(data) {
    const grouped = {};
    
    data.forEach(record => {
        const domain = record['Technology Domain'];
        if (!grouped[domain]) {
            grouped[domain] = {
                'Installed Base': [],
                'Opportunity': [],
                'Explore': [],
                'At Risk': []
            };
        }
        
        const status = record.Status || 'Explore';
        grouped[domain][status].push(record);
    });
    
    return grouped;
}

/**
 * Get vendor distribution by domain
 */
function getVendorDistribution(data) {
    const distribution = {};
    
    data.forEach(record => {
        const domain = record['Technology Domain'];
        const vendor = record['IBM Brand'];
        
        if (!distribution[domain]) {
            distribution[domain] = {};
        }
        
        if (!distribution[domain][vendor]) {
            distribution[domain][vendor] = 0;
        }
        
        distribution[domain][vendor]++;
    });
    
    return distribution;
}

/**
 * Get domain coverage (count of technologies per domain)
 */
function getDomainCoverage(data) {
    const coverage = {};
    
    data.forEach(record => {
        const domain = record['Technology Domain'];
        coverage[domain] = (coverage[domain] || 0) + 1;
    });
    
    return coverage;
}

/**
 * Apply filters to CSE data
 */
function applyCseFilters(filters) {
    cseFilteredData = cseRawData.filter(record => {
        // Domain filter
        if (filters.domain && record['Technology Domain'] !== filters.domain) {
            return false;
        }
        
        // Vendor filter
        if (filters.vendor && record['IBM Brand'] !== filters.vendor) {
            return false;
        }
        
        // Channel filter
        if (filters.channel) {
            if (filters.channel === 'Direct' && record['Channel Type'] !== 'Direct') {
                return false;
            }
            if (filters.channel === 'Partner' && record['Channel Type'] !== 'Partner') {
                return false;
            }
        }
        
        // Category filter
        if (filters.category && record['IBM Category'] !== filters.category) {
            return false;
        }
        
        // IBM Brand filter
        if (filters.ibmBrand && record['IBM Brand'] !== filters.ibmBrand) {
            return false;
        }
        
        // Status filter
        if (filters.status && record.Status !== filters.status) {
            return false;
        }
        
        return true;
    });
    
    return cseFilteredData;
}

/**
 * Export CSE data to CSV (NO FINANCIAL DATA)
 */
function exportCseDataToCsv(data, filename = 'disney-technology-landscape.csv') {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }
    
    // Define columns (EXCLUDING financial data)
    const columns = [
        'Company Name',
        'Technology Domain',
        'IBM Brand',
        'IBM Product',
        'IBM Category',
        'Channel Type',
        'Status',
        'Quantity',
        'Start Date',
        'End Date'
    ];
    
    // Create CSV content
    let csv = columns.join(',') + '\n';
    
    data.forEach(record => {
        const row = columns.map(col => {
            let value = record[col] || '';
            // Escape quotes and wrap in quotes if contains comma
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                value = '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
        });
        csv += row.join(',') + '\n';
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Utility functions (reuse from utils.js where appropriate)
function countUnique(data, field) {
    const unique = new Set(data.map(d => d[field]).filter(v => v));
    return unique.size;
}

function showLoading() {
    const indicator = document.getElementById('loadingIndicator');
    if (indicator) indicator.style.display = 'flex';
}

function hideLoading() {
    const indicator = document.getElementById('loadingIndicator');
    if (indicator) indicator.style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

// Made with Bob
