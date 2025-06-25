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
    // Add SVG icons
    const playIcon = document.querySelector('.icon-play');
    if (playIcon) {
        playIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    }

    const downloadIcon = document.querySelector('.icon-download');
    if (downloadIcon) {
        downloadIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
    }

    // Toggle functionality for Payment Delay
    const delayToggle = document.getElementById('apply-delay');
    if (delayToggle) {
        delayToggle.addEventListener('change', function() {
            const delayContainer = document.querySelector('.delay-days-container');
            delayContainer.style.display = this.checked ? 'block' : 'none';
        });
    }
}

// Cash Flow Simulation function
function simulateCashFlow() {
    console.log('Starting cash flow simulation...');
    
    // Collect all input values
    const inputs = collectInputValues();
    console.log('Input values:', inputs);
    
    // Show summary and table sections
    document.querySelector('.summary-section').style.display = 'block';
    document.querySelector('.table-section').style.display = 'block';
    document.querySelector('.graph-section').style.display = 'block';
    
    // Run simulation (to be implemented in Phase 3)
    // const results = runCashFlowSimulation(inputs);
    // updateSummaryCards(results);
    // generateCashFlowTable(results);
    // generateCashFlowGraph(results);
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

// Utility function to format currency
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