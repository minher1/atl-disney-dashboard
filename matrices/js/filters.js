// Filter management for IBM Book of Business Dashboard

let currentFilters = {
    search: '',
    revenueStream: '',
    brand: '',
    channel: ''
};

/**
 * Initialize filter controls
 */
function initializeFilters() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            currentFilters.search = e.target.value;
            applyFiltersAndUpdate();
        }, 300));
    }
    
    // Revenue stream filter
    const revenueStreamFilter = document.getElementById('revenueStreamFilter');
    if (revenueStreamFilter) {
        revenueStreamFilter.addEventListener('change', (e) => {
            currentFilters.revenueStream = e.target.value;
            applyFiltersAndUpdate();
        });
    }
    
    // Brand filter
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) {
        brandFilter.addEventListener('change', (e) => {
            currentFilters.brand = e.target.value;
            applyFiltersAndUpdate();
        });
    }
    
    // Channel filter
    const channelFilter = document.getElementById('channelFilter');
    if (channelFilter) {
        channelFilter.addEventListener('change', (e) => {
            currentFilters.channel = e.target.value;
            applyFiltersAndUpdate();
        });
    }
}

/**
 * Populate filter dropdowns with unique values
 */
function populateFilters(data) {
    // Revenue streams
    const revenueStreams = getUniqueValues(data, 'Revenue Stream');
    const revenueStreamFilter = document.getElementById('revenueStreamFilter');
    if (revenueStreamFilter) {
        revenueStreamFilter.innerHTML = '<option value="">All Revenue Streams</option>';
        revenueStreams.forEach(stream => {
            const option = document.createElement('option');
            option.value = stream;
            option.textContent = stream;
            revenueStreamFilter.appendChild(option);
        });
    }
    
    // Brands
    const brands = getUniqueValues(data, 'IBM Brand');
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) {
        brandFilter.innerHTML = '<option value="">All Brands</option>';
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
    }
}

/**
 * Apply filters and update dashboard
 */
function applyFiltersAndUpdate() {
    const filtered = updateFilteredData(currentFilters);
    updateDashboard(filtered);
}

/**
 * Reset all filters
 */
function resetAllFilters() {
    currentFilters = {
        search: '',
        revenueStream: '',
        brand: '',
        channel: ''
    };
    
    // Reset UI
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    const revenueStreamFilter = document.getElementById('revenueStreamFilter');
    if (revenueStreamFilter) revenueStreamFilter.value = '';
    
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) brandFilter.value = '';
    
    const channelFilter = document.getElementById('channelFilter');
    if (channelFilter) channelFilter.value = '';
    
    // Update dashboard
    const data = resetFilters();
    updateDashboard(data);
}

/**
 * Get current filter state
 */
function getCurrentFilters() {
    return { ...currentFilters };
}

// Made with Bob
