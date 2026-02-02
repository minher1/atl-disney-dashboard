// Main dashboard controller for IBM Book of Business

/**
 * Initialize dashboard
 */
async function initializeDashboard() {
    try {
        console.log('Initializing IBM Book of Business Dashboard...');
        
        // Load data
        const data = await loadData();
        
        if (!data || data.length === 0) {
            showError('No data available to display');
            return;
        }
        
        // Initialize components
        initializeCharts();
        initializeFilters();
        populateFilters(data);
        
        // Initial render
        updateDashboard(data);
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showError('Failed to initialize dashboard');
    }
}

/**
 * Update entire dashboard with data
 */
function updateDashboard(data) {
    updateSummaryMetrics(data);
    updateRevenueStreamTable(data);
    updateBrandTable(data);
    updateCategoryTable(data);
    updatePortfolioTable(data);
    updateDomainTable(data);
    updateTopProductsTable(data);
    updateBookOfBusinessTable(data);
    updateAllCharts(data);
}

/**
 * Update summary metrics
 */
function updateSummaryMetrics(data) {
    const metrics = calculateSummaryMetrics(data);
    
    const totalSpendEl = document.getElementById('totalSpend');
    if (totalSpendEl) totalSpendEl.textContent = formatCurrency(metrics.totalSpend);
    
    const totalCompaniesEl = document.getElementById('totalCompanies');
    if (totalCompaniesEl) totalCompaniesEl.textContent = metrics.totalCompanies.toLocaleString();
    
    const totalSitesEl = document.getElementById('totalSites');
    if (totalSitesEl) totalSitesEl.textContent = metrics.totalSites.toLocaleString();
    
    const dateRangeEl = document.getElementById('dateRange');
    if (dateRangeEl) dateRangeEl.textContent = metrics.dateRange;
    
    const partnerSpendEl = document.getElementById('partnerSpend');
    if (partnerSpendEl) partnerSpendEl.textContent = formatCurrency(metrics.partnerSpend);
}

/**
 * Update revenue stream table
 */
function updateRevenueStreamTable(data) {
    const tbody = document.querySelector('#revenueStreamTable tbody');
    if (!tbody) return;
    
    const streams = calculateRevenueStreams(data);
    
    tbody.innerHTML = streams.map(stream => `
        <tr>
            <td>${stream.stream}</td>
            <td class="currency">${formatCurrency(stream.spend)}</td>
            <td>${stream.count.toLocaleString()}</td>
            <td class="currency">${formatCurrency(stream.avgValue)}</td>
            <td class="percentage">${formatPercentage(stream.percentage)}</td>
        </tr>
    `).join('');
}

/**
 * Update brand table
 */
function updateBrandTable(data) {
    const tbody = document.querySelector('#brandTable tbody');
    if (!tbody) return;
    
    const brands = calculateBrands(data);
    
    tbody.innerHTML = brands.map(brand => `
        <tr>
            <td>${brand.brand}</td>
            <td class="currency">${formatCurrency(brand.spend)}</td>
            <td>${brand.count.toLocaleString()}</td>
            <td class="percentage">${formatPercentage(brand.percentage)}</td>
        </tr>
    `).join('');
}

/**
 * Update category table
 */
function updateCategoryTable(data) {
    const tbody = document.querySelector('#categoryTable tbody');
    if (!tbody) return;
    
    const categories = calculateCategories(data);
    
    tbody.innerHTML = categories.map(category => `
        <tr>
            <td>${category.category}</td>
            <td class="currency">${formatCurrency(category.spend)}</td>
            <td>${category.count.toLocaleString()}</td>
            <td class="percentage">${formatPercentage(category.percentage)}</td>
        </tr>
    `).join('');
}

/**
 * Update portfolio table
 */
function updatePortfolioTable(data) {
    const tbody = document.querySelector('#portfolioTable tbody');
    if (!tbody) return;
    
    const portfolios = calculatePortfolios(data);
    
    tbody.innerHTML = portfolios.map(portfolio => `
        <tr>
            <td>${portfolio.portfolio}</td>
            <td class="currency">${formatCurrency(portfolio.spend)}</td>
            <td>${portfolio.count.toLocaleString()}</td>
            <td class="percentage">${formatPercentage(portfolio.percentage)}</td>
        </tr>
    `).join('');
}

/**
 * Update domain table
 */
function updateDomainTable(data) {
    const tbody = document.querySelector('#domainTable tbody');
    if (!tbody) return;
    
    const domains = calculateDomains(data);
    
    tbody.innerHTML = domains.map(domain => `
        <tr>
            <td>${domain.domain}</td>
            <td class="currency">${formatCurrency(domain.spend)}</td>
            <td>${domain.count.toLocaleString()}</td>
            <td class="percentage">${formatPercentage(domain.percentage)}</td>
        </tr>
    `).join('');
}

/**
 * Update top products table
 */
function updateTopProductsTable(data) {
    const tbody = document.querySelector('#topProductsTable tbody');
    if (!tbody) return;
    
    const products = getTopProducts(data, 10);
    
    tbody.innerHTML = products.map((product, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${product.product}</td>
            <td class="currency">${formatCurrency(product.spend)}</td>
        </tr>
    `).join('');
}


/**
 * Update Book of Business table
 */
function updateBookOfBusinessTable(data) {
    const tbody = document.querySelector('#bobTable tbody');
    if (!tbody) return;
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center">No data matches the current filters</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${row['Site Number'] || ''}</td>
            <td>${row['Company Name'] || ''}</td>
            <td>${row['IBM Category'] || ''}</td>
            <td>${row['IBM Brand'] || ''}</td>
            <td>${row['IBM Product'] || ''}</td>
            <td>${row['Revenue Stream'] || ''}</td>
            <td class="currency">${formatCurrency(row['Annualized Spend ($)'])}</td>
            <td>${formatDate(row['Start Date'])}</td>
            <td>${formatDate(row['End Date'])}</td>
        </tr>
    `).join('');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // PDF Export button
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => {
            exportDashboardToPDF();
        });
    }
    
    // CSV Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = getCurrentData();
            exportToCSV(data, 'ibm-book-of-business.csv');
        });
    }
    
    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            resetAllFilters();
            const data = await loadData();
            updateDashboard(data);
        });
    }
}

/**
 * Export dashboard to PDF
 */
function exportDashboardToPDF() {
    const element = document.querySelector('.dashboard-container');
    
    // Add PDF export class for styling
    element.classList.add('pdf-export');
    
    // Hide buttons and filters for PDF
    const elementsToHide = [
        ...document.querySelectorAll('.header-actions'),
        ...document.querySelectorAll('.filters-container')
    ];
    
    elementsToHide.forEach(el => {
        el.style.display = 'none';
    });
    
    // Limit Book of Business table to first 30 rows for PDF (more space in landscape)
    const bobTable = document.querySelector('#bobTable tbody');
    const allRows = bobTable ? Array.from(bobTable.querySelectorAll('tr')) : [];
    const rowsToHide = allRows.slice(30);
    rowsToHide.forEach(row => row.style.display = 'none');
    
    const opt = {
        margin: [0.4, 0.5, 0.4, 0.5],
        filename: 'IBM-Disney-Book-of-Business-Report.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
            scale: 1.8,
            logging: false,
            letterRendering: true,
            useCORS: true,
            allowTaint: true
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'landscape',
            compress: true
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.dashboard-section:nth-child(5), .dashboard-section:nth-child(8)'
        }
    };
    
    // Show loading message
    const btn = document.getElementById('exportPdfBtn');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Generating PDF...';
    btn.disabled = true;
    
    html2pdf().set(opt).from(element).save().then(() => {
        // Restore original state
        element.classList.remove('pdf-export');
        elementsToHide.forEach(el => el.style.display = '');
        rowsToHide.forEach(row => row.style.display = '');
        btn.textContent = originalText;
        btn.disabled = false;
    }).catch(err => {
        console.error('PDF generation error:', err);
        alert('Error generating PDF. Please try again.');
        // Restore original state
        element.classList.remove('pdf-export');
        elementsToHide.forEach(el => el.style.display = '');
        rowsToHide.forEach(row => row.style.display = '');
        btn.textContent = originalText;
        btn.disabled = false;
    });
}

/**
 * Handle window resize
 */
window.addEventListener('resize', debounce(() => {
    if (charts.revenueStream) charts.revenueStream.resize();
    if (charts.brand) charts.brand.resize();
    if (charts.category) charts.category.resize();
    if (charts.portfolio) charts.portfolio.resize();
    if (charts.domain) charts.domain.resize();
}, 250));

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
    destroyCharts();
});

// Made with Bob
