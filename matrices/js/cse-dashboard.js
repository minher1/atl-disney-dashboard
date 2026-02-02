// CSE Dashboard Controller - Main orchestration

let currentSection = 'landscape';
let currentFilters = {};
let currentDomainData = [];
let currentDomain = '';

/**
 * Initialize CSE dashboard
 */
async function initializeCseDashboard() {
    try {
        console.log('Initializing CSE Technology Landscape Dashboard...');
        
        // Load data (without financial information)
        const data = await loadCseData();
        
        if (!data || data.length === 0) {
            showError('No data available to display');
            return;
        }
        
        // Initialize components
        initializeCseCharts();
        setupCseNavigation();
        populateCseFilters(data);
        
        // Initial render
        updateCseDashboard(data);
        
        // Setup event listeners
        setupCseEventListeners();
        
        console.log('CSE Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing CSE dashboard:', error);
        showError('Failed to initialize dashboard');
    }
}

/**
 * Update entire CSE dashboard
 */
function updateCseDashboard(data) {
    if (currentSection === 'landscape') {
        updateLandscapeSection(data);
    } else if (currentSection === 'ibm-footprint') {
        updateIbmFootprintSection(data);
    }
}

/**
 * Update landscape section
 */
function updateLandscapeSection(data) {
    // Update summary metrics
    const summary = calculateLandscapeSummary(data);
    document.getElementById('totalTechnologies').textContent = summary.totalTechnologies;
    document.getElementById('uniqueVendors').textContent = summary.uniqueVendors;
    document.getElementById('totalDomains').textContent = summary.totalDomains;
    document.getElementById('partnerChannels').textContent = summary.partnerChannels;
    document.getElementById('businessUnits').textContent = summary.businessUnits;
    
    // Update charts
    updateVendorDomainChart(data);
    updateDomainCoverageChart(data);
    
    // Update vendor table
    updateVendorTable(data);
}

/**
 * Update IBM footprint section
 */
function updateIbmFootprintSection(data) {
    // Update summary metrics
    const summary = calculateIbmSummary(data);
    document.getElementById('installedCount').textContent = summary.installedCount;
    document.getElementById('opportunityCount').textContent = summary.opportunityCount;
    document.getElementById('exploreCount').textContent = summary.exploreCount;
    document.getElementById('riskCount').textContent = summary.riskCount;
    
    // Update capability map
    updateCapabilityMap(data);
    
    // Update status chart
    updateIbmStatusChart(data);
    
    // Update IBM table
    updateIbmTable(data);
}

/**
 * Update vendor ecosystem table
 */
function updateVendorTable(data) {
    const tbody = document.getElementById('vendorTableBody');
    if (!tbody) return;
    
    // Group by vendor and domain
    const vendorMap = {};
    
    data.forEach(record => {
        const key = `${record['IBM Brand']}-${record['Technology Domain']}`;
        if (!vendorMap[key]) {
            vendorMap[key] = {
                vendor: record['IBM Brand'],
                domain: record['Technology Domain'],
                category: record['IBM Category'],
                count: 0,
                channel: record['Channel Type'],
                partners: new Set(),
                businessUnits: new Set()
            };
        }
        vendorMap[key].count++;
        vendorMap[key].businessUnits.add(record['Company Name']);
        if (record['Partner Name'] && record['Partner Name'] !== 'N/A') {
            vendorMap[key].partners.add(record['Partner Name']);
        }
    });
    
    const rows = Object.values(vendorMap).sort((a, b) => b.count - a.count);
    
    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No data matches current filters</td></tr>';
        return;
    }
    
    tbody.innerHTML = rows.map(row => {
        const partnerInfo = row.partners.size > 0
            ? Array.from(row.partners).join(', ')
            : (row.channel === 'Direct' ? 'Direct' : 'N/A');
        return `
            <tr>
                <td><strong>${row.vendor}</strong></td>
                <td>${row.domain}</td>
                <td>${row.category}</td>
                <td>${row.count}</td>
                <td>${row.channel}</td>
                <td>${partnerInfo}</td>
                <td>${row.businessUnits.size}</td>
            </tr>
        `;
    }).join('');
}

/**
 * Update IBM capability map with clickable tiles
 */
function updateCapabilityMap(data) {
    const mapContainer = document.getElementById('capabilityMap');
    if (!mapContainer) return;
    
    const grouped = groupIbmByDomainAndStatus(data);
    const domains = Object.keys(grouped).sort();
    
    if (domains.length === 0) {
        mapContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📊</div><div class="empty-state-message">No data matches current filters</div></div>';
        return;
    }
    
    mapContainer.innerHTML = domains.map(domain => {
        const domainData = grouped[domain];
        const allTechs = [
            ...domainData['Installed Base'],
            ...domainData['Opportunity'],
            ...domainData['Explore'],
            ...domainData['At Risk']
        ];
        
        if (allTechs.length === 0) return '';
        
        // Calculate status counts
        const statusCounts = {
            installed: domainData['Installed Base'].length,
            opportunity: domainData['Opportunity'].length,
            explore: domainData['Explore'].length,
            risk: domainData['At Risk'].length
        };
        
        const totalCount = allTechs.length;
        
        // Calculate percentages for status bar
        const statusPercentages = {
            installed: (statusCounts.installed / totalCount) * 100,
            opportunity: (statusCounts.opportunity / totalCount) * 100,
            explore: (statusCounts.explore / totalCount) * 100,
            risk: (statusCounts.risk / totalCount) * 100
        };
        
        // Determine dominant status for color
        const dominantStatus = Object.entries(statusCounts)
            .sort((a, b) => b[1] - a[1])[0][0];
        
        const colorMap = {
            installed: '#24a148',
            opportunity: '#0f62fe',
            explore: '#f1c21b',
            risk: '#da1e28'
        };
        
        return `
            <div class="domain-tile" data-domain="${domain}"
                 style="--tile-color-1: ${colorMap[dominantStatus]}; --tile-color-2: ${colorMap[dominantStatus]};">
                <div class="domain-tile-header">
                    <h3 class="domain-title">${domain}</h3>
                    <div class="domain-count">${totalCount}</div>
                </div>
                
                <div class="domain-status-bar">
                    ${statusPercentages.installed > 0 ? `<div class="status-segment installed" style="width: ${statusPercentages.installed}%"></div>` : ''}
                    ${statusPercentages.opportunity > 0 ? `<div class="status-segment opportunity" style="width: ${statusPercentages.opportunity}%"></div>` : ''}
                    ${statusPercentages.explore > 0 ? `<div class="status-segment explore" style="width: ${statusPercentages.explore}%"></div>` : ''}
                    ${statusPercentages.risk > 0 ? `<div class="status-segment risk" style="width: ${statusPercentages.risk}%"></div>` : ''}
                </div>
                
                <div class="domain-meta">
                    <div class="domain-status-summary">
                        ${statusCounts.installed > 0 ? `<div class="status-mini-badge"><span class="dot installed"></span><span>${statusCounts.installed}</span></div>` : ''}
                        ${statusCounts.opportunity > 0 ? `<div class="status-mini-badge"><span class="dot opportunity"></span><span>${statusCounts.opportunity}</span></div>` : ''}
                        ${statusCounts.explore > 0 ? `<div class="status-mini-badge"><span class="dot explore"></span><span>${statusCounts.explore}</span></div>` : ''}
                        ${statusCounts.risk > 0 ? `<div class="status-mini-badge"><span class="dot risk"></span><span>${statusCounts.risk}</span></div>` : ''}
                    </div>
                </div>
                
                <div class="domain-click-hint">Click to explore →</div>
            </div>
        `;
    }).join('');
    
    // Add click handlers to domain tiles
    document.querySelectorAll('.domain-tile').forEach(tile => {
        tile.addEventListener('click', function() {
            const domain = this.dataset.domain;
            openDomainModal(domain, data);
        });
    });
}

/**
 * Update IBM technology table
 */
function updateIbmTable(data) {
    const tbody = document.getElementById('ibmTableBody');
    if (!tbody) return;
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No data matches current filters</td></tr>';
        return;
    }
    
    const sortedData = [...data].sort((a, b) => {
        // Sort by domain, then status, then product
        if (a['Technology Domain'] !== b['Technology Domain']) {
            return a['Technology Domain'].localeCompare(b['Technology Domain']);
        }
        if (a.Status !== b.Status) {
            return a.Status.localeCompare(b.Status);
        }
        return a['IBM Product'].localeCompare(b['IBM Product']);
    });
    
    tbody.innerHTML = sortedData.map(record => {
        const statusClass = record.Status.toLowerCase().replace(/ /g, '-').replace('/', '');
        return `
            <tr>
                <td>${record['Technology Domain']}</td>
                <td>${record['IBM Brand']}</td>
                <td><strong>${record['IBM Product']}</strong></td>
                <td>${record['IBM Category']}</td>
                <td><span class="status-badge ${statusClass}">${record.Status}</span></td>
                <td>${record['Channel Type']}</td>
                <td>${record['Company Name']}</td>
            </tr>
        `;
    }).join('');
}

/**
 * Setup navigation between sections
 */
function setupCseNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.cse-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionId = tab.dataset.section;
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active section
            sections.forEach(s => s.classList.remove('active'));
            const activeSection = document.getElementById(`${sectionId}-section`);
            if (activeSection) {
                activeSection.classList.add('active');
            }
            
            currentSection = sectionId;
            
            // Update dashboard for new section
            updateCseDashboard(cseFilteredData);
        });
    });
}

/**
 * Populate filter dropdowns
 */
function populateCseFilters(data) {
    // Landscape filters
    populateFilterDropdown('domainFilter', data, 'Technology Domain');
    populateFilterDropdown('vendorFilter', data, 'IBM Brand');
    populateFilterDropdown('categoryFilter', data, 'IBM Category');
    
    // IBM filters
    populateFilterDropdown('ibmDomainFilter', data, 'Technology Domain');
    populateFilterDropdown('ibmBrandFilter', data, 'IBM Brand');
}

/**
 * Populate a single filter dropdown
 */
function populateFilterDropdown(elementId, data, field) {
    const select = document.getElementById(elementId);
    if (!select) return;
    
    const values = [...new Set(data.map(d => d[field]).filter(v => v))].sort();
    
    // Keep the "All" option and add values
    const currentOptions = select.innerHTML;
    select.innerHTML = currentOptions.split('</option>')[0] + '</option>' + 
        values.map(value => `<option value="${value}">${value}</option>`).join('');
}

/**
 * Setup event listeners
 */
function setupCseEventListeners() {
    // Landscape filters
    document.getElementById('domainFilter')?.addEventListener('change', applyLandscapeFilters);
    document.getElementById('vendorFilter')?.addEventListener('change', applyLandscapeFilters);
    document.getElementById('channelFilter')?.addEventListener('change', applyLandscapeFilters);
    document.getElementById('categoryFilter')?.addEventListener('change', applyLandscapeFilters);
    document.getElementById('clearFiltersBtn')?.addEventListener('click', clearLandscapeFilters);
    
    // IBM filters
    document.getElementById('ibmDomainFilter')?.addEventListener('change', applyIbmFilters);
    document.getElementById('ibmBrandFilter')?.addEventListener('change', applyIbmFilters);
    document.getElementById('ibmStatusFilter')?.addEventListener('change', applyIbmFilters);
    document.getElementById('clearIbmFiltersBtn')?.addEventListener('click', clearIbmFilters);
    
    // Action buttons
    document.getElementById('exportCseBtn')?.addEventListener('click', () => {
        exportCseDataToCsv(cseFilteredData);
    });
    
    document.getElementById('refreshCseBtn')?.addEventListener('click', () => {
        location.reload();
    });
}

/**
 * Apply landscape filters
 */
function applyLandscapeFilters() {
    currentFilters = {
        domain: document.getElementById('domainFilter')?.value || '',
        vendor: document.getElementById('vendorFilter')?.value || '',
        channel: document.getElementById('channelFilter')?.value || '',
        category: document.getElementById('categoryFilter')?.value || ''
    };
    
    const filtered = applyCseFilters(currentFilters);
    updateLandscapeSection(filtered);
}

/**
 * Apply IBM filters
 */
function applyIbmFilters() {
    currentFilters = {
        domain: document.getElementById('ibmDomainFilter')?.value || '',
        ibmBrand: document.getElementById('ibmBrandFilter')?.value || '',
        status: document.getElementById('ibmStatusFilter')?.value || ''
    };
    
    const filtered = applyCseFilters(currentFilters);
    updateIbmFootprintSection(filtered);
}

/**
 * Clear landscape filters
 */
function clearLandscapeFilters() {
    document.getElementById('domainFilter').value = '';
    document.getElementById('vendorFilter').value = '';
    document.getElementById('channelFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    currentFilters = {};
    cseFilteredData = [...cseRawData];
    updateLandscapeSection(cseFilteredData);
}

/**
 * Clear IBM filters
 */
function clearIbmFilters() {
    document.getElementById('ibmDomainFilter').value = '';
    document.getElementById('ibmBrandFilter').value = '';
    document.getElementById('ibmStatusFilter').value = '';
    currentFilters = {};
    cseFilteredData = [...cseRawData];
    updateIbmFootprintSection(cseFilteredData);
}

/**
 * Open domain detail modal
 */
function openDomainModal(domain, allData) {
    currentDomain = domain;
    currentDomainData = allData.filter(d => d['Technology Domain'] === domain);
    
    // Set modal title
    document.getElementById('modalDomainTitle').textContent = `${domain} - IBM Technology Details`;
    
    // Populate filters
    populateDomainFilters(currentDomainData);
    
    // Render initial view
    renderDomainModal(currentDomainData);
    
    // Show modal
    document.getElementById('domainModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close domain modal
 */
function closeDomainModal() {
    document.getElementById('domainModal').classList.remove('active');
    document.body.style.overflow = '';
    currentDomain = '';
    currentDomainData = [];
}

/**
 * Populate domain modal filters
 */
function populateDomainFilters(data) {
    // IBM Brand filter
    const brands = [...new Set(data.map(d => d['IBM Brand']).filter(v => v))].sort();
    const brandSelect = document.getElementById('modalBrandFilter');
    brandSelect.innerHTML = '<option value="">All Brands</option>' +
        brands.map(b => `<option value="${b}">${b}</option>`).join('');
    
    // Company filter
    const companies = [...new Set(data.map(d => d['Company Name']).filter(v => v))].sort();
    const companySelect = document.getElementById('modalCompanyFilter');
    companySelect.innerHTML = '<option value="">All Companies</option>' +
        companies.map(c => `<option value="${c}">${c}</option>`).join('');
}

/**
 * Render domain modal content
 */
function renderDomainModal(data) {
    // Render summary cards
    renderDomainSummaryCards(data);
    
    // Render product grid
    renderDomainProductGrid(data);
}

/**
 * Render domain summary cards
 */
function renderDomainSummaryCards(data) {
    const container = document.getElementById('domainSummaryCards');
    if (!container) return;
    
    const statusCounts = {
        'Installed Base': data.filter(d => d.Status === 'Installed Base').length,
        'Opportunity': data.filter(d => d.Status === 'Opportunity').length,
        'Explore': data.filter(d => d.Status === 'Explore').length,
        'At Risk': data.filter(d => d.Status === 'At Risk').length
    };
    
    const directCount = data.filter(d => d['Channel Type'] === 'Direct').length;
    const partnerCount = data.filter(d => d['Channel Type'] === 'Partner').length;
    const totalQuantity = data.reduce((sum, d) => sum + (parseInt(d.Quantity) || 0), 0);
    const uniqueCompanies = new Set(data.map(d => d['Company Name'])).size;
    
    container.innerHTML = `
        <div class="domain-summary-card installed">
            <div class="domain-summary-label">Installed Base</div>
            <div class="domain-summary-value">${statusCounts['Installed Base']}</div>
        </div>
        <div class="domain-summary-card opportunity">
            <div class="domain-summary-label">Opportunities</div>
            <div class="domain-summary-value">${statusCounts['Opportunity']}</div>
        </div>
        <div class="domain-summary-card explore">
            <div class="domain-summary-label">Explore</div>
            <div class="domain-summary-value">${statusCounts['Explore']}</div>
        </div>
        <div class="domain-summary-card risk">
            <div class="domain-summary-label">At Risk</div>
            <div class="domain-summary-value">${statusCounts['At Risk']}</div>
        </div>
        <div class="domain-summary-card">
            <div class="domain-summary-label">Direct / Partner</div>
            <div class="domain-summary-value">${directCount} / ${partnerCount}</div>
        </div>
        <div class="domain-summary-card">
            <div class="domain-summary-label">Total Quantity</div>
            <div class="domain-summary-value">${totalQuantity}</div>
        </div>
        <div class="domain-summary-card">
            <div class="domain-summary-label">Disney Entities</div>
            <div class="domain-summary-value">${uniqueCompanies}</div>
        </div>
    `;
}

/**
 * Render domain product grid
 */
function renderDomainProductGrid(data) {
    const container = document.getElementById('domainProductGrid');
    if (!container) return;
    
    if (data.length === 0) {
        container.innerHTML = `
            <div class="domain-empty-state">
                <div class="domain-empty-icon">🔍</div>
                <div class="domain-empty-message">No products match the selected filters</div>
            </div>
        `;
        return;
    }
    
    // Sort by status priority, then product name
    const statusPriority = { 'Installed Base': 1, 'Opportunity': 2, 'Explore': 3, 'At Risk': 4 };
    const sortedData = [...data].sort((a, b) => {
        const priorityDiff = statusPriority[a.Status] - statusPriority[b.Status];
        if (priorityDiff !== 0) return priorityDiff;
        return a['IBM Product'].localeCompare(b['IBM Product']);
    });
    
    container.innerHTML = sortedData.map(product => {
        const statusClass = product.Status.toLowerCase().replace(/ /g, '-').replace('/', '');
        return `
            <div class="product-card ${statusClass}">
                <div class="product-card-header">
                    <h4 class="product-name">${product['IBM Product']}</h4>
                    <span class="product-status-badge ${statusClass}">${product.Status}</span>
                </div>
                <div class="product-meta">
                    <div class="product-meta-row">
                        <span class="product-meta-label">IBM Brand:</span>
                        <span class="product-meta-value">${product['IBM Brand']}</span>
                    </div>
                    <div class="product-meta-row">
                        <span class="product-meta-label">Category:</span>
                        <span class="product-meta-value">${product['IBM Category']}</span>
                    </div>
                    <div class="product-meta-row">
                        <span class="product-meta-label">Quantity:</span>
                        <span class="product-meta-value product-quantity">${product.Quantity || 'N/A'}</span>
                    </div>
                    <div class="product-meta-row">
                        <span class="product-meta-label">Channel:</span>
                        <span class="product-meta-value"><span class="product-channel">${product['Channel Type']}${product['Partner Name'] && product['Partner Name'] !== 'N/A' ? ' - ' + product['Partner Name'] : ''}</span></span>
                    </div>
                    <div class="product-meta-row">
                        <span class="product-meta-label">Company:</span>
                        <span class="product-meta-value">${product['Company Name']}</span>
                    </div>
                    ${product['Start Date'] ? `
                    <div class="product-meta-row">
                        <span class="product-meta-label">Period:</span>
                        <span class="product-meta-value">${product['Start Date']} to ${product['End Date'] || 'Ongoing'}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Apply domain modal filters
 */
function applyDomainFilters() {
    const statusFilter = document.getElementById('modalStatusFilter').value;
    const brandFilter = document.getElementById('modalBrandFilter').value;
    const channelFilter = document.getElementById('modalChannelFilter').value;
    const companyFilter = document.getElementById('modalCompanyFilter').value;
    
    let filtered = [...currentDomainData];
    
    if (statusFilter) {
        filtered = filtered.filter(d => d.Status === statusFilter);
    }
    if (brandFilter) {
        filtered = filtered.filter(d => d['IBM Brand'] === brandFilter);
    }
    if (channelFilter) {
        filtered = filtered.filter(d => d['Channel Type'] === channelFilter);
    }
    if (companyFilter) {
        filtered = filtered.filter(d => d['Company Name'] === companyFilter);
    }
    
    renderDomainModal(filtered);
}

/**
 * Setup domain modal event listeners
 */
function setupDomainModalListeners() {
    // Close button
    document.getElementById('closeDomainModal')?.addEventListener('click', closeDomainModal);
    
    // Close on background click
    document.getElementById('domainModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeDomainModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('domainModal').classList.contains('active')) {
            closeDomainModal();
        }
    });
    
    // Filter listeners
    document.getElementById('modalStatusFilter')?.addEventListener('change', applyDomainFilters);
    document.getElementById('modalBrandFilter')?.addEventListener('change', applyDomainFilters);
    document.getElementById('modalChannelFilter')?.addEventListener('change', applyDomainFilters);
    document.getElementById('modalCompanyFilter')?.addEventListener('change', applyDomainFilters);
}

// Initialize dashboard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeCseDashboard();
        setupDomainModalListeners();
    });
} else {
    initializeCseDashboard();
    setupDomainModalListeners();
}

// Made with Bob
