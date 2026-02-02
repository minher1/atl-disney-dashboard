// CSE Charts - Visualizations without financial data

let vendorDomainChart = null;
let domainCoverageChart = null;
let ibmStatusChart = null;

/**
 * Initialize all CSE charts
 */
function initializeCseCharts() {
    // Vendor Domain Chart
    const vendorCtx = document.getElementById('vendorDomainChart');
    if (vendorCtx) {
        vendorDomainChart = new Chart(vendorCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    title: {
                        display: true,
                        text: 'Technology Count by Domain and Vendor',
                        font: { size: 16 }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' technologies';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Technology Domain'
                        }
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Technology Count'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    // Domain Coverage Chart
    const coverageCtx = document.getElementById('domainCoverageChart');
    if (coverageCtx) {
        domainCoverageChart = new Chart(coverageCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: []
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    title: {
                        display: true,
                        text: 'Technology Distribution by Domain',
                        font: { size: 16 }
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return label + ': ' + value + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }

    // IBM Status Chart
    const statusCtx = document.getElementById('ibmStatusChart');
    if (statusCtx) {
        ibmStatusChart = new Chart(statusCtx, {
            type: 'pie',
            data: {
                labels: ['Installed Base', 'Opportunity', 'Explore', 'At Risk'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        '#24a148',  // Installed Base - Green
                        '#0f62fe',  // Opportunity - Blue
                        '#f1c21b',  // Explore - Yellow
                        '#da1e28'   // At Risk - Red
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'IBM Technology Status Distribution',
                        font: { size: 16 }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return label + ': ' + value + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * Update vendor domain chart
 */
function updateVendorDomainChart(data) {
    if (!vendorDomainChart) return;

    const distribution = getVendorDistribution(data);
    const domains = Object.keys(distribution).sort();
    const vendors = new Set();
    
    // Collect all unique vendors
    Object.values(distribution).forEach(domainVendors => {
        Object.keys(domainVendors).forEach(vendor => vendors.add(vendor));
    });
    
    const vendorList = Array.from(vendors).sort();
    const colors = generateColorPalette(vendorList.length);
    
    // Create datasets for each vendor
    const datasets = vendorList.map((vendor, index) => ({
        label: vendor,
        data: domains.map(domain => distribution[domain][vendor] || 0),
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 1
    }));
    
    vendorDomainChart.data.labels = domains;
    vendorDomainChart.data.datasets = datasets;
    vendorDomainChart.update();
}

/**
 * Update domain coverage chart
 */
function updateDomainCoverageChart(data) {
    if (!domainCoverageChart) return;

    const coverage = getDomainCoverage(data);
    const domains = Object.keys(coverage).sort();
    const counts = domains.map(d => coverage[d]);
    const colors = generateColorPalette(domains.length);
    
    domainCoverageChart.data.labels = domains;
    domainCoverageChart.data.datasets[0].data = counts;
    domainCoverageChart.data.datasets[0].backgroundColor = colors;
    domainCoverageChart.update();
}

/**
 * Update IBM status chart
 */
function updateIbmStatusChart(data) {
    if (!ibmStatusChart) return;

    const summary = calculateIbmSummary(data);
    
    ibmStatusChart.data.datasets[0].data = [
        summary.installedCount,
        summary.opportunityCount,
        summary.exploreCount,
        summary.riskCount
    ];
    ibmStatusChart.update();
}

/**
 * Update all CSE charts
 */
function updateAllCseCharts(data) {
    updateVendorDomainChart(data);
    updateDomainCoverageChart(data);
    updateIbmStatusChart(data);
}

/**
 * Generate color palette for charts
 */
function generateColorPalette(count) {
    const baseColors = [
        '#0f62fe', '#0043ce', '#002d9c', '#001d6c',
        '#24a148', '#198038', '#0e6027', '#054719',
        '#f1c21b', '#d4a216', '#b28600', '#8e6a00',
        '#da1e28', '#a2191f', '#750e13', '#520408',
        '#8a3ffc', '#6929c4', '#491d8b', '#31135e',
        '#ff7eb6', '#ee5396', '#d12771', '#9f1853'
    ];
    
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
}

// Made with Bob
