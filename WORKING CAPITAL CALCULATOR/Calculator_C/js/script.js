// Component loader function
async function loadComponent(componentPath, targetId) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(targetId).innerHTML = html;
        
        // Initialize component-specific functionality after loading
        if (targetId === 'cashflow-tab') {
            initializeCashFlowForm();
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tabs
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = event.target;
    clickedButton.classList.add('active');
}

// Initialize Cash Flow Form functionality
function initializeCashFlowForm() {
    // Toggle functionality for GST
    const gstToggle = document.getElementById('apply-gst');
    if (gstToggle) {
        gstToggle.addEventListener('change', function() {
            const gstContainer = document.querySelector('.gst-rate-container');
            gstContainer.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Toggle functionality for Payment Delay
    const delayToggle = document.getElementById('apply-delay');
    if (delayToggle) {
        delayToggle.addEventListener('change', function() {
            const delayContainer = document.querySelector('.delay-days-container');
            delayContainer.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Add SVG icons
    const playIcon = document.querySelector('.icon-play');
    if (playIcon) {
        playIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    }

    const downloadIcon = document.querySelector('.icon-download');
    if (downloadIcon) {
        downloadIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
    }
}

// Global variables to store simulation data
let cashFlowData = [];
let summaryData = {
    totalInflow: 0,
    totalOutflow: 0,
    minBalance: 0,
    finalBalance: 0,
    partnerInvestment: 0
};
let cashFlowChart = null; // Store chart instance

// Cash Flow Simulation function
function simulateCashFlow() {
    console.log('Starting cash flow simulation...');
    
    // Reset data
    cashFlowData = [];
    summaryData = {
        totalInflow: 0,
        totalOutflow: 0,
        minBalance: 0,
        finalBalance: 0,
        partnerInvestment: 0
    };
    
    // Collect all input values
    const inputs = collectInputValues();
    
    // First pass: Calculate cash flows without Partner B investment
    const firstPassData = calculateCashFlows(inputs, 0);
    
    // Find minimum balance
    let minBalance = 0;
    firstPassData.forEach(entry => {
        if (entry.balance < minBalance) {
            minBalance = entry.balance;
        }
    });
    
    // Calculate Partner B investment needed
    const partnerInvestment = Math.abs(minBalance);
    summaryData.partnerInvestment = partnerInvestment;
    
    // Update the Partner B investment field
    document.getElementById('partner-investment').value = partnerInvestment;
    
    // Second pass: Calculate with Partner B investment
    cashFlowData = calculateCashFlows(inputs, partnerInvestment);
    
    // Calculate summary data
    calculateSummary();
    
    // Update UI
    updateSummaryCards();
    generateCashFlowTable();
    generateCashFlowGraph();
    
    // Show results sections
    document.querySelector('.summary-section').style.display = 'block';
    document.querySelector('.table-section').style.display = 'block';
    document.querySelector('.graph-section').style.display = 'block';
}

// Calculate production cycles
function calculateProductionCycles(inputs) {
    const cycles = [];
    const startDate = new Date(inputs.startDate);
    const endDate = new Date('2025-12-31');
    
    let cycleNumber = 1;
    let currentDay = 1;
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    while (currentDay <= totalDays && cycleNumber <= 12) {
        // Determine order quantity based on cycle number
        let orderQty;
        if (cycleNumber <= 4) {
            orderQty = inputs.orderQuantities.month1;
        } else if (cycleNumber <= 8) {
            orderQty = inputs.orderQuantities.month2;
        } else {
            orderQty = inputs.orderQuantities.month3;
        }
        
        // Calculate unit numbers
        let totalUnitsBefore = 0;
        if (cycleNumber <= 4) {
            totalUnitsBefore = (cycleNumber - 1) * inputs.orderQuantities.month1;
        } else if (cycleNumber <= 8) {
            totalUnitsBefore = 4 * inputs.orderQuantities.month1 + 
                              (cycleNumber - 5) * inputs.orderQuantities.month2;
        } else {
            totalUnitsBefore = 4 * inputs.orderQuantities.month1 + 
                              4 * inputs.orderQuantities.month2 + 
                              (cycleNumber - 9) * inputs.orderQuantities.month3;
        }
        
        const startUnit = totalUnitsBefore + 1;
        const endUnit = totalUnitsBefore + orderQty;
        
        cycles.push({
            cycleNumber: cycleNumber,
            startDay: currentDay,
            endDay: currentDay + inputs.leadTime - 1,
            materialPurchaseDay: cycleNumber === 1 ? 1 : cycles[cycleNumber - 2].endDay,
            quantity: orderQty,
            unitsProduced: `C${String(cycleNumber).padStart(2, '0')}U${String(startUnit).padStart(3, '0')}-C${String(cycleNumber).padStart(2, '0')}U${String(endUnit).padStart(3, '0')}`
        });
        
        currentDay += inputs.cycleFrequency;
        cycleNumber++;
    }
    
    return cycles;
}

// Calculate all orders
function calculateOrders(inputs, cycles) {
    const orders = [];
    let orderNumber = 1;
    let orderDay = inputs.initialOrderDay;
    const totalDays = Math.floor((new Date('2025-12-31') - new Date(inputs.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    
    while (orderDay <= totalDays) {
        // Find which cycle this order corresponds to
        const cycleIndex = Math.min(Math.floor((orderDay - inputs.initialOrderDay) / inputs.orderFrequency) + 1, cycles.length);
        const cycle = cycles[cycleIndex - 1];
        const quantity = cycle ? cycle.quantity : inputs.orderQuantities.month1;
        
        orders.push({
            orderNumber: orderNumber,
            orderDay: orderDay,
            deliveryDay: orderNumber === 1 ? orderDay : orderDay + 6,
            paymentType: orderNumber === 1 ? 'full' : 'split',
            quantity: quantity,
            cycleNumber: cycleIndex
        });
        
        orderDay += inputs.orderFrequency;
        orderNumber++;
    }
    
    return orders;
}

// Calculate cash flows
function calculateCashFlows(inputs, partnerInvestment) {
    const transactions = [];
    let balance = inputs.initialBalance;
    
    const startDate = new Date(inputs.startDate);
    const endDate = new Date('2025-12-31');
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Pre-calculate all production cycles
    const productionCycles = calculateProductionCycles(inputs);
    
    // Pre-calculate all orders
    const orders = calculateOrders(inputs, productionCycles);
    
    // Track monthly production for labour cost
    const monthlyProduction = {};
    
    // Process each day
    for (let dayCount = 1; dayCount <= totalDays; dayCount++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + dayCount - 1);
        
        const dayOfMonth = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const monthKey = `${year}-${month}`;
        
        // Skip 31st day (holiday) except for final day
        if (dayOfMonth === 31 && dayCount < totalDays) {
            continue;
        }
        
        // Day 1: Partner B Investment
        if (dayCount === 1 && partnerInvestment > 0) {
            balance += partnerInvestment;
            transactions.push({
                date: new Date(currentDate),
                day: dayCount,
                details: 'Partner B Working Capital Investment',
                head: 'Partner B Investment',
                outflow: 0,
                inflow: partnerInvestment,
                balance: balance
            });
        }
        
        // Check for material purchases
        const purchaseCycle = productionCycles.find(c => c.materialPurchaseDay === dayCount);
        if (purchaseCycle) {
            const materialCost = (inputs.steelCost + inputs.boughtOutCost) * purchaseCycle.quantity;
            const gstAmount = inputs.applyGST ? materialCost * (inputs.gstRate / 100) : 0;
            const totalCost = materialCost + gstAmount;
            
            balance -= totalCost;
            transactions.push({
                date: new Date(currentDate),
                day: dayCount,
                details: `Material Purchase for ${purchaseCycle.unitsProduced}`,
                head: 'Materials',
                outflow: totalCost,
                inflow: 0,
                balance: balance
            });
        }
        
        // Check for order arrivals
        const newOrders = orders.filter(o => o.orderDay === dayCount);
        newOrders.forEach(order => {
            if (order.paymentType === 'full') {
                // Cycle 1: Full payment on delivery
                const revenue = inputs.cashInPerUnit * order.quantity;
                const gstAmount = inputs.applyGST ? revenue * (inputs.gstRate / 100) : 0;
                const netRevenue = revenue - gstAmount;
                
                const paymentDate = inputs.applyDelay ? 
                    addWorkingDays(currentDate, inputs.delayDays, inputs.startDate) : currentDate;
                const paymentDay = Math.floor((paymentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                
                if (paymentDay === dayCount) {
                    balance += netRevenue;
                    transactions.push({
                        date: new Date(currentDate),
                        day: dayCount,
                        details: `Order Reception & Full Payment - C01U001-C01U${String(order.quantity).padStart(3, '0')}`,
                        head: 'Sales - Full Payment',
                        outflow: 0,
                        inflow: netRevenue,
                        balance: balance
                    });
                }
            } else {
                // 50% advance payment
                const advancePayment = inputs.cashInPerUnit * order.quantity * 0.5;
                const gstAmount = inputs.applyGST ? advancePayment * (inputs.gstRate / 100) : 0;
                const netAdvance = advancePayment - gstAmount;
                
                balance += netAdvance;
                const cycle = productionCycles[order.cycleNumber - 1];
                transactions.push({
                    date: new Date(currentDate),
                    day: dayCount,
                    details: `Order ${order.orderNumber} - Advance Payment (50%) for ${cycle.unitsProduced}`,
                    head: 'Sales - Advance',
                    outflow: 0,
                    inflow: netAdvance,
                    balance: balance
                });
            }
        });
        
        // Check for deliveries (final payments)
        const deliveries = orders.filter(o => o.deliveryDay === dayCount && o.paymentType === 'split');
        deliveries.forEach(order => {
            const finalPayment = inputs.cashInPerUnit * order.quantity * 0.5;
            const gstAmount = inputs.applyGST ? finalPayment * (inputs.gstRate / 100) : 0;
            const netFinal = finalPayment - gstAmount;
            
            const paymentDate = inputs.applyDelay ? 
                addWorkingDays(currentDate, inputs.delayDays, inputs.startDate) : currentDate;
            const paymentDay = Math.floor((paymentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            
            if (paymentDay === dayCount) {
                balance += netFinal;
                const cycle = productionCycles[order.cycleNumber - 1];
                transactions.push({
                    date: new Date(currentDate),
                    day: dayCount,
                    details: `Order ${order.orderNumber} - Final Payment (50%) on Delivery - ${cycle.unitsProduced}`,
                    head: 'Sales - Final Payment',
                    outflow: 0,
                    inflow: netFinal,
                    balance: balance
                });
            }
        });
        
        // Check for month start (labour and fixed costs for previous month)
        if (dayOfMonth === 1 && dayCount > 1) {
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevYear = month === 0 ? year - 1 : year;
            const prevMonthKey = `${prevYear}-${prevMonth}`;
            
            // Labour cost for previous month's production
            const unitsLastMonth = monthlyProduction[prevMonthKey] || 0;
            if (unitsLastMonth > 0) {
                const labourCost = inputs.labourCost * unitsLastMonth;
                balance -= labourCost;
                
                transactions.push({
                    date: new Date(currentDate),
                    day: dayCount,
                    details: `Labour Cost Payment for ${unitsLastMonth} units produced in ${getMonthName(prevMonth)} ${prevYear}`,
                    head: 'Labour',
                    outflow: labourCost,
                    inflow: 0,
                    balance: balance
                });
            }
            
            // Fixed costs for previous month
            balance -= inputs.fixedCosts;
            transactions.push({
                date: new Date(currentDate),
                day: dayCount,
                details: `Fixed Monthly Costs - ${getMonthName(prevMonth)} ${prevYear}`,
                head: 'Fixed Costs',
                outflow: inputs.fixedCosts,
                inflow: 0,
                balance: balance
            });
        }
        
        // Track production completion
        const completedCycle = productionCycles.find(c => c.endDay === dayCount);
        if (completedCycle) {
            if (!monthlyProduction[monthKey]) {
                monthlyProduction[monthKey] = 0;
            }
            monthlyProduction[monthKey] += completedCycle.quantity;
        }
    }
    
    // Final settlement on Dec 31 - Add pending labour and fixed costs as payables
    const lastDate = new Date(endDate);
    const lastMonth = lastDate.getMonth();
    const lastYear = lastDate.getFullYear();
    const lastMonthKey = `${lastYear}-${lastMonth}`;
    const unitsInDecember = monthlyProduction[lastMonthKey] || 0;
    
    if (unitsInDecember > 0 || inputs.fixedCosts > 0) {
        transactions.push({
            date: new Date(endDate),
            day: totalDays,
            details: `Payables: December Labour (${unitsInDecember} units) and Fixed Costs - Due Jan 1, 2026`,
            head: 'Year-end Payables',
            outflow: 0,
            inflow: 0,
            balance: balance
        });
    }
    
    return transactions;
}

// Calculate summary data
function calculateSummary() {
    summaryData.totalInflow = 0;
    summaryData.totalOutflow = 0;
    summaryData.minBalance = cashFlowData.length > 0 ? cashFlowData[0].balance : 0;
    
    cashFlowData.forEach(entry => {
        summaryData.totalInflow += entry.inflow;
        summaryData.totalOutflow += entry.outflow;
        if (entry.balance < summaryData.minBalance) {
            summaryData.minBalance = entry.balance;
        }
    });
    
    summaryData.finalBalance = cashFlowData.length > 0 ? 
        cashFlowData[cashFlowData.length - 1].balance : 0;
}

// Update summary cards
function updateSummaryCards() {
    document.getElementById('total-inflow').textContent = formatCurrency(summaryData.totalInflow);
    document.getElementById('total-outflow').textContent = formatCurrency(summaryData.totalOutflow);
    document.getElementById('min-balance').textContent = formatCurrency(summaryData.minBalance);
    document.getElementById('final-balance').textContent = formatCurrency(summaryData.finalBalance);
    
    // Update colors based on values
    const minBalanceElement = document.getElementById('min-balance');
    const finalBalanceElement = document.getElementById('final-balance');
    
    minBalanceElement.className = summaryData.minBalance < 0 ? 'card-value negative' : 'card-value positive';
    finalBalanceElement.className = summaryData.finalBalance < 0 ? 'card-value negative' : 'card-value positive';
}

// Generate cash flow table
function generateCashFlowTable() {
    const tableContainer = document.querySelector('.table-container');
    
    let tableHTML = `
        <table class="cash-flow-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Transaction Details</th>
                    <th>Transaction Head</th>
                    <th>Cash Outflow (₹)</th>
                    <th>Cash Inflow (₹)</th>
                    <th>Balance (₹)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    cashFlowData.forEach(entry => {
        const balanceClass = entry.balance < 0 ? 'negative' : '';
        tableHTML += `
            <tr>
                <td>${formatDate(entry.date)}</td>
                <td>${entry.day}</td>
                <td>${entry.details}</td>
                <td>${entry.head}</td>
                <td class="amount ${entry.outflow > 0 ? 'negative' : ''}">${entry.outflow > 0 ? formatCurrency(entry.outflow) : '-'}</td>
                <td class="amount ${entry.inflow > 0 ? 'positive' : ''}">${entry.inflow > 0 ? formatCurrency(entry.inflow) : '-'}</td>
                <td class="amount ${balanceClass}">${formatCurrency(entry.balance)}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
}

// Collect all input values from the form
function collectInputValues() {
    return {
        // Project Setup
        startDate: document.getElementById('start-date').value,
        initialBalance: parseFloat(document.getElementById('initial-balance').value) || 0,
        
        // Production Setup
        startingInventory: parseInt(document.getElementById('starting-inventory').value) || 0,
        initialOrderDay: parseInt(document.getElementById('initial-order-day').value) || 0,
        orderFrequency: parseInt(document.getElementById('order-frequency').value) || 0,
        plantCapacity: parseInt(document.getElementById('plant-capacity').value) || 0,
        leadTime: parseInt(document.getElementById('lead-time').value) || 0,
        cycleFrequency: parseInt(document.getElementById('cycle-frequency').value) || 0,
        
        // Order Quantities
        orderQuantities: {
            month1: parseInt(document.getElementById('order-qty-month1').value) || 6,
            month2: parseInt(document.getElementById('order-qty-month2').value) || 6,
            month3: parseInt(document.getElementById('order-qty-month3').value) || 6
        },
        
        // Operations
        workingDays: parseInt(document.getElementById('working-days').value) || 0,
        shiftOperations: parseInt(document.getElementById('shift-operations').value) || 0,
        currentTarget: parseInt(document.getElementById('current-target').value) || 0,
        growthTarget: parseInt(document.getElementById('growth-target').value) || 0,
        
        // Costs
        steelCost: parseFloat(document.getElementById('steel-cost').value) || 0,
        boughtOutCost: parseFloat(document.getElementById('bought-out-cost').value) || 0,
        labourCost: parseFloat(document.getElementById('labour-cost').value) || 0,
        fixedCosts: parseFloat(document.getElementById('fixed-costs').value) || 0,
        
        // Revenue
        cashInPerUnit: parseFloat(document.getElementById('cash-in-per-unit').value) || 0,
        materialPurchaseDay: parseInt(document.getElementById('material-purchase-day').value) || 0,
        
        // Optional Settings
        applyGST: document.getElementById('apply-gst').checked,
        gstRate: parseFloat(document.getElementById('gst-rate').value) || 0,
        applyDelay: document.getElementById('apply-delay').checked,
        delayDays: parseInt(document.getElementById('delay-days').value) || 0
    };
}

// Export to Excel function
function exportToExcel() {
    console.log('Exporting to Excel...');
    // This will be implemented in Phase 4
    alert('Export functionality will be implemented in Phase 4');
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function getMonthName(monthIndex) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
}

function addWorkingDays(date, days, startDate) {
    const result = new Date(date);
    let addedDays = 0;
    
    while (addedDays < days) {
        result.setDate(result.getDate() + 1);
        // Skip if 31st (holiday)
        if (result.getDate() !== 31) {
            addedDays++;
        }
    }
    
    return result;
}

// Generate Cash Flow Graph
function generateCashFlowGraph() {
    // Aggregate data by date
    const dailyData = {};
    
    cashFlowData.forEach(entry => {
        const dateKey = formatDate(entry.date);
        
        if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
                date: entry.date,
                inflow: 0,
                outflow: 0,
                balance: entry.balance
            };
        }
        
        dailyData[dateKey].inflow += entry.inflow;
        dailyData[dateKey].outflow += entry.outflow;
        dailyData[dateKey].balance = entry.balance; // Take the last balance of the day
    });
    
    // Convert to arrays for Chart.js
    const labels = [];
    const inflowData = [];
    const outflowData = [];
    const balanceData = [];
    
    Object.keys(dailyData).forEach(dateKey => {
        const data = dailyData[dateKey];
        labels.push(dateKey);
        inflowData.push(data.inflow / 100000); // Convert to lakhs
        outflowData.push(-data.outflow / 100000); // Negative for below axis
        balanceData.push(data.balance / 100000); // Convert to lakhs
    });
    
    // Destroy existing chart if it exists
    if (cashFlowChart) {
        cashFlowChart.destroy();
    }
    
    // Chart configuration
    const ctx = document.getElementById('cashFlowChart').getContext('2d');
    cashFlowChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Cash Inflow',
                    data: inflowData,
                    backgroundColor: 'rgba(102, 252, 241, 0.6)',
                    borderColor: '#66FCF1',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Cash Outflow',
                    data: outflowData,
                    backgroundColor: 'rgba(252, 102, 102, 0.6)',
                    borderColor: '#FC6666',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Balance',
                    data: balanceData,
                    type: 'line',
                    borderColor: '#66FCF1',
                    backgroundColor: 'rgba(102, 252, 241, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#66FCF1',
                    pointBorderColor: '#45A29E',
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    tension: 0.1,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Daily Cash Flow Analysis',
                    color: '#C5C6C7',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#C5C6C7',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(31, 40, 51, 0.9)',
                    titleColor: '#66FCF1',
                    bodyColor: '#C5C6C7',
                    borderColor: '#45A29E',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '₹' + Math.abs(context.parsed.y).toFixed(2) + ' L';
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        color: 'rgba(69, 162, 158, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#8B8C8D',
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(69, 162, 158, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#8B8C8D',
                        callback: function(value) {
                            return '₹' + value + ' L';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Amount (in Lakhs)',
                        color: '#8B8C8D'
                    }
                }
            }
        }
    });
}