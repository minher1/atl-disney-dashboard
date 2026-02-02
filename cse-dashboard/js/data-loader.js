// Data loader for IBM Book of Business Dashboard

let rawData = [];
let filteredData = [];

/**
 * Load data from JSON file
 */
async function loadData() {
    try {
        showLoading();
        const response = await fetch('data/book-of-business.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        rawData = data;
        filteredData = [...rawData];
        
        console.log(`Loaded ${rawData.length} records`);
        return rawData;
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load dashboard data. Please check if the data file exists.');
        return [];
    } finally {
        hideLoading();
    }
}

/**
 * Calculate executive summary metrics
 */
function calculateSummaryMetrics(data) {
    const totalSpend = sumBy(data, 'Annualized Spend ($)');
    const totalContracts = data.length;
    const totalCompanies = countUnique(data, 'Company Name');
    const totalSites = countUnique(data, 'Site Number');
    
    const startDates = data.map(d => d['Start Date']).filter(d => d);
    const endDates = data.map(d => d['End Date']).filter(d => d);
    const dateRange = getDateRange([...startDates, ...endDates]);
    
    const partnerSpend = sumBy(
        data.filter(d => d['Direct or Partner'] && d['Direct or Partner'].toLowerCase() !== 'direct'),
        'Annualized Spend ($)'
    );
    
    const directSpend = sumBy(
        data.filter(d => d['Direct or Partner'] && d['Direct or Partner'].toLowerCase() === 'direct'),
        'Annualized Spend ($)'
    );
    
    return {
        totalSpend,
        totalContracts,
        totalCompanies,
        totalSites,
        dateRange,
        partnerSpend,
        directSpend
    };
}

/**
 * Calculate revenue stream analysis
 */
function calculateRevenueStreams(data) {
    const grouped = groupBy(data, 'Revenue Stream');
    const totalSpend = sumBy(data, 'Annualized Spend ($)');
    
    const streams = Object.keys(grouped).map(stream => {
        const streamData = grouped[stream];
        const spend = sumBy(streamData, 'Annualized Spend ($)');
        const count = streamData.length;
        const avgValue = count > 0 ? spend / count : 0;
        const percentage = percentageOfTotal(spend, totalSpend);
        
        return {
            stream,
            spend,
            count,
            avgValue,
            percentage
        };
    });
    
    return sortBy(streams, 'spend', true);
}

/**
 * Calculate IBM Brand analysis
 */
function calculateBrands(data) {
    const grouped = groupBy(data, 'IBM Brand');
    const totalSpend = sumBy(data, 'Annualized Spend ($)');
    
    const brands = Object.keys(grouped).map(brand => {
        const brandData = grouped[brand];
        const spend = sumBy(brandData, 'Annualized Spend ($)');
        const count = brandData.length;
        const percentage = percentageOfTotal(spend, totalSpend);
        
        return {
            brand,
            spend,
            count,
            percentage
        };
    });
    
    return sortBy(brands, 'spend', true);
}

/**
 * Calculate IBM Category analysis
 */
function calculateCategories(data) {
    const grouped = groupBy(data, 'IBM Category');
    const totalSpend = sumBy(data, 'Annualized Spend ($)');
    
    const categories = Object.keys(grouped).map(category => {
        const categoryData = grouped[category];
        const spend = sumBy(categoryData, 'Annualized Spend ($)');
        const count = categoryData.length;
        const percentage = percentageOfTotal(spend, totalSpend);
        
        return {
            category,
            spend,
            count,
            percentage
        };
    });
    
    return sortBy(categories, 'spend', true);
}

/**
 * Calculate Portfolio analysis
 */
function calculatePortfolios(data) {
    const grouped = groupBy(data, 'Portfolio');
    const totalSpend = sumBy(data, 'Annualized Spend ($)');
    
    const portfolios = Object.keys(grouped).map(portfolio => {
        const portfolioData = grouped[portfolio];
        const spend = sumBy(portfolioData, 'Annualized Spend ($)');
        const count = portfolioData.length;
        const percentage = percentageOfTotal(spend, totalSpend);
        
        return {
            portfolio,
            spend,
            count,
            percentage
        };
    });
    
    return sortBy(portfolios, 'spend', true);
}

/**
 * Calculate Domain analysis
 */
function calculateDomains(data) {
    const grouped = groupBy(data, 'Domain');
    const totalSpend = sumBy(data, 'Annualized Spend ($)');
    
    const domains = Object.keys(grouped).map(domain => {
        const domainData = grouped[domain];
        const spend = sumBy(domainData, 'Annualized Spend ($)');
        const count = domainData.length;
        const percentage = percentageOfTotal(spend, totalSpend);
        
        return {
            domain,
            spend,
            count,
            percentage
        };
    });
    
    return sortBy(domains, 'spend', true);
}

/**
 * Get top products by spend
 */
function getTopProducts(data, n = 10) {
    // Group by product and sum spend
    const grouped = groupBy(data, 'IBM Product');
    
    const products = Object.keys(grouped).map(product => {
        const productData = grouped[product];
        const spend = sumBy(productData, 'Annualized Spend ($)');
        
        return {
            product,
            spend
        };
    });
    
    return sortBy(products, 'spend', true).slice(0, n);
}

/**
 * Calculate partner channel analysis
 */
function calculatePartners(data) {
    // Filter out Direct channel
    const partnerData = data.filter(d => 
        d['Direct or Partner'] && 
        d['Direct or Partner'].toLowerCase() !== 'direct'
    );
    
    const grouped = groupBy(partnerData, 'Direct or Partner');
    
    const partners = Object.keys(grouped).map(partner => {
        const partnerRecords = grouped[partner];
        const spend = sumBy(partnerRecords, 'Annualized Spend ($)');
        const count = partnerRecords.length;
        
        return {
            partner,
            spend,
            count
        };
    });
    
    return sortBy(partners, 'spend', true);
}

/**
 * Get unique values for filters
 */
function getUniqueValues(data, field) {
    const values = [...new Set(data.map(d => d[field]).filter(v => v))];
    return values.sort();
}

/**
 * Apply filters to data
 */
function applyFilters(data, filters) {
    let result = [...data];
    
    // Search filter
    if (filters.search) {
        result = searchFilter(result, filters.search, [
            'Company Name',
            'IBM Product',
            'Site Number',
            'IBM Brand',
            'IBM Category'
        ]);
    }
    
    // Revenue stream filter
    if (filters.revenueStream) {
        result = result.filter(d => d['Revenue Stream'] === filters.revenueStream);
    }
    
    // Brand filter
    if (filters.brand) {
        result = result.filter(d => d['IBM Brand'] === filters.brand);
    }
    
    // Channel filter
    if (filters.channel) {
        if (filters.channel === 'Direct') {
            result = result.filter(d => 
                d['Direct or Partner'] && 
                d['Direct or Partner'].toLowerCase() === 'direct'
            );
        } else if (filters.channel === 'Partner') {
            result = result.filter(d => 
                d['Direct or Partner'] && 
                d['Direct or Partner'].toLowerCase() !== 'direct'
            );
        }
    }
    
    return result;
}

/**
 * Update filtered data
 */
function updateFilteredData(filters) {
    filteredData = applyFilters(rawData, filters);
    return filteredData;
}

/**
 * Get current data (filtered or raw)
 */
function getCurrentData() {
    return filteredData.length > 0 ? filteredData : rawData;
}

/**
 * Reset filters
 */
function resetFilters() {
    filteredData = [...rawData];
    return filteredData;
}

// Made with Bob
