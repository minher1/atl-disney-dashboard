// Disney Enterprise Entitlements Dashboard - Charts
// Handles all chart creation and updates using Chart.js

let brandChart = null;
let productChart = null;
let regionChart = null;
let supportChart = null;

function createCharts() {
    createBrandChart();
    createProductChart();
    createRegionChart();
    createSupportChart();
}

function updateCharts() {
    if (brandChart) brandChart.destroy();
    if (productChart) productChart.destroy();
    if (regionChart) regionChart.destroy();
    if (supportChart) supportChart.destroy();
    
    createCharts();
}

function createBrandChart() {
    const data = filteredData;
    
    // Aggregate by brand
    const brandData = {};
    data.forEach(row => {
        const brand = row.Brand || 'Unknown';
        const qty = parseFloat(row['Software license or appliance quantity']) || 0;
        brandData[brand] = (brandData[brand] || 0) + qty;
    });
    
    // Sort by quantity and get top 10
    const sortedBrands = Object.entries(brandData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const labels = sortedBrands.map(item => item[0]);
    const values = sortedBrands.map(item => item[1]);
    
    const ctx = document.getElementById('brandChart').getContext('2d');
    brandChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Quantity',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Quantity: ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function createProductChart() {
    const data = filteredData;
    
    // Aggregate by product
    const productData = {};
    data.forEach(row => {
        const product = row['Current product'] || 'Unknown';
        const qty = parseFloat(row['Software license or appliance quantity']) || 0;
        productData[product] = (productData[product] || 0) + qty;
    });
    
    // Sort by quantity and get top 10
    const sortedProducts = Object.entries(productData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const labels = sortedProducts.map(item => item[0]);
    const values = sortedProducts.map(item => item[1]);
    
    const ctx = document.getElementById('productChart').getContext('2d');
    productChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Quantity',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Quantity: ' + context.parsed.x.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function createRegionChart() {
    const data = filteredData;
    
    // Aggregate by region
    const regionData = {};
    data.forEach(row => {
        const region = row['CRM region'] || 'Unknown';
        const qty = parseFloat(row['Software license or appliance quantity']) || 0;
        regionData[region] = (regionData[region] || 0) + qty;
    });
    
    const labels = Object.keys(regionData);
    const values = Object.values(regionData);
    
    // Generate colors
    const colors = generateColors(labels.length);
    
    const ctx = document.getElementById('regionChart').getContext('2d');
    regionChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function createSupportChart() {
    const data = filteredData;
    
    // Calculate support levels
    const supportData = {
        'Active S&S': 0,
        'Sustained Support': 0,
        'Extended Support': 0,
        'Advanced Support': 0,
        'No Support': 0
    };
    
    data.forEach(row => {
        const activeQty = parseFloat(row['Active S&S quantity']) || 0;
        const sustained = parseFloat(row['Sustained Support']) || 0;
        const extended = parseFloat(row['Extended Support']) || 0;
        const advanced = parseFloat(row['Advanced Support']) || 0;
        const licQty = parseFloat(row['Software license or appliance quantity']) || 0;
        
        supportData['Active S&S'] += activeQty;
        supportData['Sustained Support'] += sustained;
        supportData['Extended Support'] += extended;
        supportData['Advanced Support'] += advanced;
        
        // Calculate licenses without support
        const totalSupport = activeQty + sustained + extended + advanced;
        if (licQty > totalSupport) {
            supportData['No Support'] += (licQty - totalSupport);
        }
    });
    
    const labels = Object.keys(supportData);
    const values = Object.values(supportData);
    
    const ctx = document.getElementById('supportChart').getContext('2d');
    supportChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(255, 152, 0, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(220, 53, 69, 0.8)'
                ],
                borderColor: [
                    'rgba(40, 167, 69, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(255, 152, 0, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(220, 53, 69, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function generateColors(count) {
    const baseColors = [
        { r: 54, g: 162, b: 235 },
        { r: 255, g: 99, b: 132 },
        { r: 255, g: 206, b: 86 },
        { r: 75, g: 192, b: 192 },
        { r: 153, g: 102, b: 255 },
        { r: 255, g: 159, b: 64 },
        { r: 199, g: 199, b: 199 },
        { r: 83, g: 102, b: 255 },
        { r: 255, g: 99, b: 255 },
        { r: 99, g: 255, b: 132 }
    ];
    
    const background = [];
    const border = [];
    
    for (let i = 0; i < count; i++) {
        const color = baseColors[i % baseColors.length];
        background.push(`rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`);
        border.push(`rgba(${color.r}, ${color.g}, ${color.b}, 1)`);
    }
    
    return { background, border };
}

// Made with Bob
