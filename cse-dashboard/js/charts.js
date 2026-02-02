// Chart management for IBM Book of Business Dashboard

let charts = {};

/**
 * Initialize all charts
 */
function initializeCharts() {
    // Set Chart.js defaults
    Chart.defaults.font.family = "'IBM Plex Sans', sans-serif";
    Chart.defaults.color = '#525252';
    
    // Create chart instances
    charts.revenueStream = createRevenueStreamChart();
    charts.brand = createBrandChart();
    charts.category = createCategoryChart();
    charts.portfolio = createPortfolioChart();
    charts.domain = createDomainChart();
}

/**
 * Create Revenue Stream Chart
 */
function createRevenueStreamChart() {
    const ctx = document.getElementById('revenueStreamChart');
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Total Spend',
                data: [],
                backgroundColor: '#366092',
                borderColor: '#366092',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Revenue Stream Distribution',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Spend: ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
}

/**
 * Create Brand Chart
 */
function createBrandChart() {
    const ctx = document.getElementById('brandChart');
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Spend by IBM Brand',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = formatCurrency(context.parsed);
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Create Category Chart
 */
function createCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Spend by IBM Category',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = formatCurrency(context.parsed);
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Create Portfolio Chart
 */
function createPortfolioChart() {
    const ctx = document.getElementById('portfolioChart');
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Total Spend',
                data: [],
                backgroundColor: '#0f62fe',
                borderColor: '#0f62fe',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Portfolio Distribution',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Spend: ' + formatCurrency(context.parsed.x);
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
}

/**
 * Create Domain Chart
 */
function createDomainChart() {
    const ctx = document.getElementById('domainChart');
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#0f62fe', '#24a148'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Spend by Domain',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = formatCurrency(context.parsed);
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Update Revenue Stream Chart
 */
function updateRevenueStreamChart(data) {
    if (!charts.revenueStream) return;
    
    const streams = calculateRevenueStreams(data);
    
    charts.revenueStream.data.labels = streams.map(s => s.stream);
    charts.revenueStream.data.datasets[0].data = streams.map(s => s.spend);
    charts.revenueStream.update();
}

/**
 * Update Brand Chart
 */
function updateBrandChart(data) {
    if (!charts.brand) return;
    
    const brands = calculateBrands(data);
    const colors = generateColorPalette(brands.length);
    
    charts.brand.data.labels = brands.map(b => b.brand);
    charts.brand.data.datasets[0].data = brands.map(b => b.spend);
    charts.brand.data.datasets[0].backgroundColor = colors;
    charts.brand.update();
}

/**
 * Update Category Chart
 */
function updateCategoryChart(data) {
    if (!charts.category) return;
    
    const categories = calculateCategories(data);
    const colors = generateColorPalette(categories.length);
    
    charts.category.data.labels = categories.map(c => c.category);
    charts.category.data.datasets[0].data = categories.map(c => c.spend);
    charts.category.data.datasets[0].backgroundColor = colors;
    charts.category.update();
}

/**
 * Update Portfolio Chart
 */
function updatePortfolioChart(data) {
    if (!charts.portfolio) return;
    
    const portfolios = calculatePortfolios(data);
    const colors = generateColorPalette(portfolios.length);
    
    charts.portfolio.data.labels = portfolios.map(p => p.portfolio);
    charts.portfolio.data.datasets[0].data = portfolios.map(p => p.spend);
    charts.portfolio.data.datasets[0].backgroundColor = colors;
    charts.portfolio.update();
}

/**
 * Update Domain Chart
 */
function updateDomainChart(data) {
    if (!charts.domain) return;
    
    const domains = calculateDomains(data);
    
    charts.domain.data.labels = domains.map(d => d.domain);
    charts.domain.data.datasets[0].data = domains.map(d => d.spend);
    charts.domain.update();
}

/**
 * Update all charts
 */
function updateAllCharts(data) {
    updateRevenueStreamChart(data);
    updateBrandChart(data);
    updateCategoryChart(data);
    updatePortfolioChart(data);
    updateDomainChart(data);
}

/**
 * Destroy all charts
 */
function destroyCharts() {
    Object.values(charts).forEach(chart => {
        if (chart) {
            chart.destroy();
        }
    });
    charts = {};
}

// Made with Bob
