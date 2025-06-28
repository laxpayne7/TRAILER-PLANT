// Component loader function
async function loadComponent(componentPath, targetId) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(targetId).innerHTML = html;
        
        // Initialize component-specific functionality after loading
        if (targetId === 'cashflow-tab') {
            initializeCashFlowForm();
        } else if (targetId === 'pnl-tab') {
            initializePnLStatement();
        } else if (targetId === 'balance-tab') {
            initializeBalanceSheet();
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Tab switching functionality
function showTab(tabName, evt) {
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
    const clickedButton = evt.target;
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

// Initialize P&L Statement functionality
function initializePnLStatement() {
    // Add SVG icons
    const refreshIcon = document.querySelector('.icon-refresh');
    if (refreshIcon) {
        refreshIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>';
    }
    
    const pdfIcon = document.querySelector('.icon-pdf');
    if (pdfIcon) {
        pdfIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
    }
    
    const excelIcon = document.querySelector('.icon-excel');
    if (excelIcon) {
        excelIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>';
    }
}

// Initialize Balance Sheet functionality
function initializeBalanceSheet() {
    // Add SVG icons
    const refreshIcon = document.querySelector('#balance-tab .icon-refresh');
    if (refreshIcon) {
        refreshIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>';
    }
    
    const pdfIcon = document.querySelector('#balance-tab .icon-pdf');
    if (pdfIcon) {
        pdfIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
    }
    
    const excelIcon = document.querySelector('#balance-tab .icon-excel');
    if (excelIcon) {
        excelIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>';
    }
}

// Balance Sheet Functions
function refreshBalanceSheet() {
    console.log('Refreshing Balance Sheet...');
    
    // Check if cash flow data exists
    if (cashFlowData.length === 0) {
        alert('Please run the Cash Flow simulation first');
        return;
    }
    
    // Generate Balance Sheet
    generateBalanceSheet();
}

function exportBalanceSheetPDF() {
    console.log('Exporting Balance Sheet to PDF...');
    alert('PDF export will be implemented in a future update');
}

function exportBalanceSheetExcel() {
    console.log('Exporting Balance Sheet to Excel...');
    
    if (cashFlowData.length === 0) {
        alert('Please generate the Balance Sheet first');
        return;
    }
    
    const bsData = calculateBalanceSheetData();
    
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // 1. Balance Sheet
    const balanceSheetData = [
        ['BALANCE SHEET'],
        ['As of ' + bsData.date],
        [''],
        ['ASSETS'],
        ['Current Assets'],
        ['  Cash and Cash Equivalents', '', bsData.assets.current.cash],
        ['  Accounts Receivable', '', bsData.assets.current.accountsReceivable],
        ['  GST Input Credit', '', bsData.assets.current.gstInputCredit],
        ['Total Current Assets', '', bsData.assets.current.totalCurrent],
        [''],
        ['TOTAL ASSETS', '', bsData.assets.totalAssets],
        [''],
        ['LIABILITIES'],
        ['Current Liabilities'],
        ['  Accounts Payable', '', bsData.liabilities.current.accountsPayable],
        ['  GST Payable', '', bsData.liabilities.current.gstPayable],
        ['Total Current Liabilities', '', bsData.liabilities.current.totalCurrent],
        [''],
        ['TOTAL LIABILITIES', '', bsData.liabilities.totalLiabilities],
        [''],
        ['EQUITY'],
        ['Partner B Investment', '', bsData.equity.partnerBInvestment],
        ['Retained Earnings', '', bsData.equity.retainedEarnings],
        [''],
        ['TOTAL EQUITY', '', bsData.equity.totalEquity],
        [''],
        ['TOTAL LIABILITIES & EQUITY', '', bsData.totalLiabilitiesAndEquity]
    ];
    
    const bsWS = XLSX.utils.aoa_to_sheet(balanceSheetData);
    bsWS['!cols'] = [{wch: 30}, {wch: 10}, {wch: 20}];
    
    // Format numbers
    for (let i = 3; i < balanceSheetData.length; i++) {
        if (typeof balanceSheetData[i][2] === 'number') {
            const cellAddress = XLSX.utils.encode_cell({r: i, c: 2});
            if (!bsWS[cellAddress]) continue;
            bsWS[cellAddress].z = '#,##0';
        }
    }
    
    XLSX.utils.book_append_sheet(wb, bsWS, "Balance Sheet");
    
    // 2. Financial Ratios Sheet
    const workingCapital = bsData.assets.current.totalCurrent - bsData.liabilities.current.totalCurrent;
    const currentRatio = bsData.liabilities.current.totalCurrent > 0 
        ? (bsData.assets.current.totalCurrent / bsData.liabilities.current.totalCurrent).toFixed(2)
        : 'N/A';
    const debtToEquity = bsData.equity.totalEquity > 0 
        ? (bsData.liabilities.totalLiabilities / bsData.equity.totalEquity).toFixed(2)
        : '0.00';
    
    const ratiosData = [
        ['Financial Ratios & Metrics'],
        [''],
        ['Metric', 'Value', 'Interpretation'],
        ['Working Capital', workingCapital, workingCapital > 0 ? 'Positive - Good liquidity' : 'Negative - Liquidity concern'],
        ['Current Ratio', currentRatio, currentRatio >= 1.5 ? 'Strong' : currentRatio >= 1 ? 'Adequate' : 'Weak'],
        ['Debt to Equity Ratio', debtToEquity, debtToEquity < 0.5 ? 'Low leverage' : 'Moderate leverage'],
        [''],
        ['Asset Composition'],
        ['Cash %', ((bsData.assets.current.cash / bsData.assets.totalAssets) * 100).toFixed(1) + '%'],
        ['Receivables %', ((bsData.assets.current.accountsReceivable / bsData.assets.totalAssets) * 100).toFixed(1) + '%'],
        [''],
        ['Funding Sources'],
        ['Partner B Investment %', ((bsData.equity.partnerBInvestment / bsData.totalLiabilitiesAndEquity) * 100).toFixed(1) + '%'],
        ['Retained Earnings %', ((bsData.equity.retainedEarnings / bsData.totalLiabilitiesAndEquity) * 100).toFixed(1) + '%'],
        ['External Liabilities %', ((bsData.liabilities.totalLiabilities / bsData.totalLiabilitiesAndEquity) * 100).toFixed(1) + '%']
    ];
    
    const ratiosWS = XLSX.utils.aoa_to_sheet(ratiosData);
    ratiosWS['!cols'] = [{wch: 25}, {wch: 20}, {wch: 30}];
    XLSX.utils.book_append_sheet(wb, ratiosWS, "Financial Ratios");
    
    // 3. Working Capital Analysis
    const wcData = [
        ['Working Capital Analysis'],
        [''],
        ['Components', 'Amount'],
        ['Current Assets'],
        ['  Cash', bsData.assets.current.cash],
        ['  Receivables', bsData.assets.current.accountsReceivable],
        ['  GST Credit', bsData.assets.current.gstInputCredit],
        ['Total Current Assets', bsData.assets.current.totalCurrent],
        [''],
        ['Current Liabilities'],
        ['  Payables', bsData.liabilities.current.accountsPayable],
        ['  GST Payable', bsData.liabilities.current.gstPayable],
        ['Total Current Liabilities', bsData.liabilities.current.totalCurrent],
        [''],
        ['Net Working Capital', workingCapital],
        [''],
        ['Working Capital Requirement Analysis'],
        ['Partner B Investment', bsData.equity.partnerBInvestment],
        ['Working Capital as % of Investment', ((workingCapital / bsData.equity.partnerBInvestment) * 100).toFixed(1) + '%']
    ];
    
    const wcWS = XLSX.utils.aoa_to_sheet(wcData);
    wcWS['!cols'] = [{wch: 35}, {wch: 20}];
    XLSX.utils.book_append_sheet(wb, wcWS, "Working Capital");
    
    // Generate filename
    const filename = `Balance_Sheet_${bsData.date.replace(/\s/g, '_').replace(/,/g, '')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Write the file
    XLSX.writeFile(wb, filename);
    
    console.log('Balance Sheet Excel export completed');
}

// Generate Balance Sheet from cash flow data
function generateBalanceSheet() {
    // Calculate Balance Sheet data
    const bsData = calculateBalanceSheetData();
    
    // Display Balance Sheet
    displayBalanceSheet(bsData);
    
    // Update metrics
    updateBalanceSheetMetrics(bsData);
    
    // Generate insights
    generateBalanceSheetInsights(bsData);
}

// Placeholder functions to be implemented
function calculateBalanceSheetData() {
    console.log('Calculating Balance Sheet data...');
    
    // Initialize Balance Sheet structure
    const bsData = {
        date: 'January 1, 2026',
        assets: {
            current: {
                cash: 0,
                accountsReceivable: 0,
                gstInputCredit: 0,
                totalCurrent: 0
            },
            totalAssets: 0
        },
        liabilities: {
            current: {
                accountsPayable: 0,
                gstPayable: 0,
                totalCurrent: 0
            },
            totalLiabilities: 0
        },
        equity: {
            partnerBInvestment: 0,
            retainedEarnings: 0,
            totalEquity: 0
        },
        totalLiabilitiesAndEquity: 0
    };
    
    // Get input values
    const inputs = collectInputValues();
    
    // 1. ASSETS
    
    // Cash = Final balance from cash flow
    bsData.assets.current.cash = summaryData.finalBalance;
    
    // Accounts Receivable = Any pending payments if delay is applied
    if (inputs.applyDelay) {
        // Check for pending payments in the last few days
        const lastTransactions = cashFlowData.slice(-10);
        lastTransactions.forEach(transaction => {
            if (transaction.details.includes('Year-end Settlement') && 
                transaction.head.includes('Sales')) {
                bsData.assets.current.accountsReceivable += transaction.inflow;
            }
        });
    }
    
    // GST Input Credit (accumulated from material purchases)
    let totalGSTOnPurchases = 0;
    let totalGSTOnSales = 0;
    
    if (inputs.applyGST) {
        cashFlowData.forEach(transaction => {
            if (transaction.head === 'Materials') {
                // Extract GST portion from material purchases
                const totalMaterialCost = transaction.outflow;
                const baseAmount = totalMaterialCost / (1 + inputs.gstRate / 100);
                const gstAmount = totalMaterialCost - baseAmount;
                totalGSTOnPurchases += gstAmount;
            }
            
            if (transaction.head.includes('Sales')) {
                // Extract GST portion from sales
                const totalSalesAmount = transaction.inflow;
                const baseAmount = totalSalesAmount / (1 + inputs.gstRate / 100);
                const gstAmount = totalSalesAmount - baseAmount;
                totalGSTOnSales += gstAmount;
            }
        });
        
        // Net GST position
        const netGST = totalGSTOnSales - totalGSTOnPurchases;
        if (netGST < 0) {
            bsData.assets.current.gstInputCredit = Math.abs(netGST);
        } else {
            bsData.liabilities.current.gstPayable = netGST;
        }
    }
    
    // Calculate total current assets
    bsData.assets.current.totalCurrent = 
        bsData.assets.current.cash + 
        bsData.assets.current.accountsReceivable + 
        bsData.assets.current.gstInputCredit;
    
    bsData.assets.totalAssets = bsData.assets.current.totalCurrent;
    
    // 2. LIABILITIES
    
    // Accounts Payable = December labour and fixed costs (paid on Jan 1)
    let decemberLabour = 0;
    let decemberFixed = 0;
    
    // Find December settlement transactions
    cashFlowData.forEach(transaction => {
        if (transaction.details.includes('December') && 
            transaction.details.includes('Year-end settlement')) {
            if (transaction.head === 'Labour') {
                decemberLabour = transaction.outflow;
            } else if (transaction.head === 'Fixed Costs') {
                decemberFixed = transaction.outflow;
            }
        }
    });
    
    bsData.liabilities.current.accountsPayable = decemberLabour + decemberFixed;
    
    // Calculate total current liabilities
    bsData.liabilities.current.totalCurrent = 
        bsData.liabilities.current.accountsPayable + 
        bsData.liabilities.current.gstPayable;
    
    bsData.liabilities.totalLiabilities = bsData.liabilities.current.totalCurrent;
    
    // 3. EQUITY
    
    // Partner B Investment
    bsData.equity.partnerBInvestment = summaryData.partnerInvestment;
    
    // Retained Earnings = Total Inflow - Total Outflow - Partner B Investment
    bsData.equity.retainedEarnings = 
        summaryData.totalInflow - summaryData.totalOutflow - summaryData.partnerInvestment;
    
    // Total Equity
    bsData.equity.totalEquity = 
        bsData.equity.partnerBInvestment + 
        bsData.equity.retainedEarnings;
    
    // Total Liabilities and Equity
    bsData.totalLiabilitiesAndEquity = 
        bsData.liabilities.totalLiabilities + 
        bsData.equity.totalEquity;
    
    // Verify balance sheet equation
    const difference = Math.abs(bsData.assets.totalAssets - bsData.totalLiabilitiesAndEquity);
    if (difference > 1) { // Allow for small rounding differences
        console.warn('Balance Sheet does not balance!', {
            assets: bsData.assets.totalAssets,
            liabilitiesAndEquity: bsData.totalLiabilitiesAndEquity,
            difference: difference
        });
    }
    
    return bsData;
}

function displayBalanceSheet(data) {
    console.log('Displaying Balance Sheet...');
    
    const bsContainer = document.querySelector('.balance-sheet-container');
    if (!bsContainer) return;
    
    let bsHTML = `
        <table class="balance-sheet-table">
            <thead>
                <tr>
                    <th colspan="2">BALANCE SHEET</th>
                </tr>
                <tr>
                    <th colspan="2" class="date-header">As of ${data.date}</th>
                </tr>
            </thead>
            <tbody>
                <!-- ASSETS -->
                <tr class="section-header">
                    <td colspan="2">ASSETS</td>
                </tr>
                <tr class="subsection">
                    <td class="indent-1">Current Assets</td>
                    <td></td>
                </tr>
                <tr>
                    <td class="indent-2">Cash and Cash Equivalents</td>
                    <td class="amount">${formatCurrency(data.assets.current.cash)}</td>
                </tr>`;
    
    if (data.assets.current.accountsReceivable > 0) {
        bsHTML += `
                <tr>
                    <td class="indent-2">Accounts Receivable</td>
                    <td class="amount">${formatCurrency(data.assets.current.accountsReceivable)}</td>
                </tr>`;
    }
    
    if (data.assets.current.gstInputCredit > 0) {
        bsHTML += `
                <tr>
                    <td class="indent-2">GST Input Credit</td>
                    <td class="amount">${formatCurrency(data.assets.current.gstInputCredit)}</td>
                </tr>`;
    }
    
    bsHTML += `
                <tr class="subtotal">
                    <td class="indent-1">Total Current Assets</td>
                    <td class="amount">${formatCurrency(data.assets.current.totalCurrent)}</td>
                </tr>
                <tr class="total-row">
                    <td>TOTAL ASSETS</td>
                    <td class="amount">${formatCurrency(data.assets.totalAssets)}</td>
                </tr>
                
                <!-- LIABILITIES -->
                <tr class="section-header">
                    <td colspan="2">LIABILITIES</td>
                </tr>
                <tr class="subsection">
                    <td class="indent-1">Current Liabilities</td>
                    <td></td>
                </tr>`;
    
    if (data.liabilities.current.accountsPayable > 0) {
        bsHTML += `
                <tr>
                    <td class="indent-2">Accounts Payable</td>
                    <td class="amount">${formatCurrency(data.liabilities.current.accountsPayable)}</td>
                </tr>`;
    }
    
    if (data.liabilities.current.gstPayable > 0) {
        bsHTML += `
                <tr>
                    <td class="indent-2">GST Payable</td>
                    <td class="amount">${formatCurrency(data.liabilities.current.gstPayable)}</td>
                </tr>`;
    }
    
    bsHTML += `
                <tr class="subtotal">
                    <td class="indent-1">Total Current Liabilities</td>
                    <td class="amount">${formatCurrency(data.liabilities.current.totalCurrent)}</td>
                </tr>
                <tr class="total-row">
                    <td>TOTAL LIABILITIES</td>
                    <td class="amount">${formatCurrency(data.liabilities.totalLiabilities)}</td>
                </tr>
                
                <!-- EQUITY -->
                <tr class="section-header">
                    <td colspan="2">EQUITY</td>
                </tr>
                <tr>
                    <td class="indent-1">Partner B Investment</td>
                    <td class="amount">${formatCurrency(data.equity.partnerBInvestment)}</td>
                </tr>
                <tr>
                    <td class="indent-1">Retained Earnings</td>
                    <td class="amount ${data.equity.retainedEarnings >= 0 ? '' : 'negative'}">${formatCurrency(data.equity.retainedEarnings)}</td>
                </tr>
                <tr class="total-row">
                    <td>TOTAL EQUITY</td>
                    <td class="amount">${formatCurrency(data.equity.totalEquity)}</td>
                </tr>
                
                <!-- TOTAL -->
                <tr class="grand-total">
                    <td>TOTAL LIABILITIES & EQUITY</td>
                    <td class="amount">${formatCurrency(data.totalLiabilitiesAndEquity)}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    bsContainer.innerHTML = bsHTML;
}

function updateBalanceSheetMetrics(data) {
    console.log('Updating Balance Sheet metrics...');
    
    // Calculate Working Capital (Current Assets - Current Liabilities)
    const workingCapital = data.assets.current.totalCurrent - data.liabilities.current.totalCurrent;
    const workingCapitalElement = document.getElementById('working-capital');
    if (workingCapitalElement) {
        workingCapitalElement.textContent = formatCurrency(workingCapital);
        workingCapitalElement.className = workingCapital >= 0 ? 'metric-value positive' : 'metric-value negative';
    }
    
    // Calculate Current Ratio (Current Assets / Current Liabilities)
    const currentRatio = data.liabilities.current.totalCurrent > 0 
        ? (data.assets.current.totalCurrent / data.liabilities.current.totalCurrent).toFixed(2)
        : 'N/A';
    const currentRatioElement = document.getElementById('current-ratio');
    if (currentRatioElement) {
        currentRatioElement.textContent = currentRatio;
        if (currentRatio !== 'N/A') {
            currentRatioElement.className = currentRatio >= 1.5 ? 'metric-value positive' : 
                                          currentRatio >= 1.0 ? 'metric-value' : 'metric-value negative';
        }
    }
    
    // Display Cash Position
    const cashPositionElement = document.getElementById('cash-position');
    if (cashPositionElement) {
        cashPositionElement.textContent = formatCurrency(data.assets.current.cash);
        cashPositionElement.className = data.assets.current.cash >= 0 ? 'metric-value positive' : 'metric-value negative';
    }
}

function generateBalanceSheetInsights(data) {
    console.log('Generating Balance Sheet insights...');
    
    const insightsContainer = document.querySelector('.bs-insights-container');
    if (!insightsContainer) return;
    
    const insights = [];
    
    // 1. Working Capital Analysis
    const workingCapital = data.assets.current.totalCurrent - data.liabilities.current.totalCurrent;
    const workingCapitalRatio = (workingCapital / data.assets.totalAssets * 100).toFixed(1);
    
    if (workingCapital > 0) {
        insights.push({
            type: 'positive',
            icon: '✓',
            text: `Positive working capital of ${formatCurrency(workingCapital)} (${workingCapitalRatio}% of total assets) indicates good liquidity`
        });
    } else {
        insights.push({
            type: 'negative',
            icon: '!',
            text: `Negative working capital of ${formatCurrency(Math.abs(workingCapital))} requires immediate attention`
        });
    }
    
    // 2. Current Ratio Analysis
    const currentRatio = data.liabilities.current.totalCurrent > 0 
        ? (data.assets.current.totalCurrent / data.liabilities.current.totalCurrent).toFixed(2)
        : 999;
    
    if (currentRatio === 999) {
        insights.push({
            type: 'positive',
            icon: '✓',
            text: `No current liabilities - excellent financial position`
        });
    } else if (currentRatio >= 2.0) {
        insights.push({
            type: 'positive',
            icon: '✓',
            text: `Current ratio of ${currentRatio} shows strong ability to meet short-term obligations`
        });
    } else if (currentRatio >= 1.0) {
        insights.push({
            type: 'neutral',
            icon: '→',
            text: `Current ratio of ${currentRatio} is adequate but could be improved`
        });
    } else {
        insights.push({
            type: 'negative',
            icon: '!',
            text: `Current ratio of ${currentRatio} indicates potential liquidity issues`
        });
    }
    
    // 3. Cash Position
    const cashToAssets = (data.assets.current.cash / data.assets.totalAssets * 100).toFixed(1);
    insights.push({
        type: 'info',
        icon: '₹',
        text: `Cash represents ${cashToAssets}% of total assets (${formatCurrency(data.assets.current.cash)})`
    });
    
    // 4. Leverage Analysis
    const debtToEquity = data.equity.totalEquity > 0 
        ? (data.liabilities.totalLiabilities / data.equity.totalEquity).toFixed(2)
        : 0;
    
    if (debtToEquity === 0) {
        insights.push({
            type: 'positive',
            icon: '✓',
            text: `Zero debt position provides maximum financial flexibility`
        });
    } else if (debtToEquity < 0.5) {
        insights.push({
            type: 'positive',
            icon: '✓',
            text: `Low debt-to-equity ratio of ${debtToEquity} indicates conservative capital structure`
        });
    } else {
        insights.push({
            type: 'neutral',
            icon: '→',
            text: `Debt-to-equity ratio of ${debtToEquity} - monitor leverage levels`
        });
    }
    
    // 5. GST Position
    if (data.assets.current.gstInputCredit > 0) {
        insights.push({
            type: 'info',
            icon: '📊',
            text: `GST input credit of ${formatCurrency(data.assets.current.gstInputCredit)} can be claimed`
        });
    } else if (data.liabilities.current.gstPayable > 0) {
        insights.push({
            type: 'info',
            icon: '📊',
            text: `GST payable of ${formatCurrency(data.liabilities.current.gstPayable)} due to authorities`
        });
    }
    
    // 6. Profitability Impact
    if (data.equity.retainedEarnings > 0) {
        const roe = (data.equity.retainedEarnings / data.equity.totalEquity * 100).toFixed(1);
        insights.push({
            type: 'positive',
            icon: '↑',
            text: `Positive retained earnings of ${formatCurrency(data.equity.retainedEarnings)} (ROE: ${roe}%)`
        });
    } else if (data.equity.retainedEarnings < 0) {
        insights.push({
            type: 'negative',
            icon: '↓',
            text: `Accumulated losses of ${formatCurrency(Math.abs(data.equity.retainedEarnings))} need to be addressed`
        });
    }
    
    // Generate HTML for insights
    let insightsHTML = '<ul class="insights-list">';
    insights.forEach(insight => {
        insightsHTML += `
            <li class="insight-item ${insight.type}">
                <span class="insight-icon">${insight.icon}</span>
                <span class="insight-text">${insight.text}</span>
            </li>
        `;
    });
    insightsHTML += '</ul>';
    
    insightsContainer.innerHTML = insightsHTML;
}

// P&L Statement Functions
function refreshPnL() {
    console.log('Refreshing P&L Statement...');
    
    // Check if cash flow data exists
    if (cashFlowData.length === 0) {
        alert('Please run the Cash Flow simulation first');
        return;
    }
    
    // Generate P&L data
    generatePnLStatement();
}

function exportPnLPDF() {
    console.log('Exporting P&L to PDF...');
    alert('PDF export will be implemented in a future update');
}

function exportPnLExcel() {
    console.log('Exporting P&L to Excel...');
    
    if (cashFlowData.length === 0) {
        alert('Please generate the P&L statement first');
        return;
    }
    
    // Get current period
    const period = document.getElementById('pnl-period').value;
    const pnlData = calculatePnLData(period);
    
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // 1. P&L Statement Sheet
    const pnlStatementData = [
        ['PROFIT & LOSS STATEMENT'],
        ['Period:', getPeriodLabel(period)],
        [''],
        ['REVENUE'],
        ['Sales Revenue (' + pnlData.revenue.unitsSold + ' units)', '', pnlData.revenue.gross],
        ['Net Revenue', '', pnlData.revenue.net],
        [''],
        ['COST OF GOODS SOLD'],
        ['Material Costs'],
        ['  Steel Materials', '', pnlData.cogs.materials.steel],
        ['  Bought-out Materials', '', pnlData.cogs.materials.boughtOut],
        ['Total Material Costs', '', pnlData.cogs.materials.total],
        ['Direct Labour', '', pnlData.cogs.labour],
        ['Total COGS', '', pnlData.cogs.total],
        [''],
        ['GROSS PROFIT', '', pnlData.grossProfit],
        ['Gross Margin %', '', pnlData.grossMarginPercent.toFixed(1) + '%'],
        [''],
        ['OPERATING EXPENSES'],
        ['Fixed Monthly Costs', '', pnlData.operatingExpenses.fixed],
        ['Total Operating Expenses', '', pnlData.operatingExpenses.fixed],
        [''],
        ['NET PROFIT BEFORE TAX', '', pnlData.netProfit],
        ['Net Margin %', '', pnlData.netMarginPercent.toFixed(1) + '%']
    ];
    
    const pnlWS = XLSX.utils.aoa_to_sheet(pnlStatementData);
    pnlWS['!cols'] = [{wch: 30}, {wch: 10}, {wch: 20}];
    
    // Format numbers
    for (let i = 4; i < pnlStatementData.length; i++) {
        if (typeof pnlStatementData[i][2] === 'number') {
            const cellAddress = XLSX.utils.encode_cell({r: i, c: 2});
            if (!pnlWS[cellAddress]) continue;
            pnlWS[cellAddress].z = '#,##0';
        }
    }
    
    XLSX.utils.book_append_sheet(wb, pnlWS, "P&L Statement");
    
    // 2. Monthly Breakdown Sheet
    const monthlyData = [
        ['Monthly Revenue Breakdown'],
        [''],
        ['Month', 'Units Sold', 'Revenue'],
        ['October', pnlData.revenue.monthlyBreakdown.october.units, pnlData.revenue.monthlyBreakdown.october.amount],
        ['November', pnlData.revenue.monthlyBreakdown.november.units, pnlData.revenue.monthlyBreakdown.november.amount],
        ['December', pnlData.revenue.monthlyBreakdown.december.units, pnlData.revenue.monthlyBreakdown.december.amount],
        [''],
        ['Total', pnlData.revenue.unitsSold, pnlData.revenue.gross]
    ];
    
    const monthlyWS = XLSX.utils.aoa_to_sheet(monthlyData);
    monthlyWS['!cols'] = [{wch: 15}, {wch: 15}, {wch: 20}];
    XLSX.utils.book_append_sheet(wb, monthlyWS, "Monthly Breakdown");
    
    // 3. Key Metrics Sheet
    const metricsData = [
        ['Key Financial Metrics'],
        [''],
        ['Metric', 'Value'],
        ['Revenue per Unit', pnlData.revenue.gross / pnlData.revenue.unitsSold],
        ['Material Cost per Unit', pnlData.cogs.materials.total / pnlData.revenue.unitsSold],
        ['Labour Cost per Unit', pnlData.cogs.labour / pnlData.revenue.unitsSold],
        ['Total COGS per Unit', pnlData.cogs.total / pnlData.revenue.unitsSold],
        ['Gross Profit per Unit', pnlData.grossProfit / pnlData.revenue.unitsSold],
        [''],
        ['Gross Margin %', pnlData.grossMarginPercent.toFixed(2) + '%'],
        ['Net Margin %', pnlData.netMarginPercent.toFixed(2) + '%'],
        ['Operating Expense Ratio', ((pnlData.operatingExpenses.fixed / pnlData.revenue.net) * 100).toFixed(2) + '%']
    ];
    
    const metricsWS = XLSX.utils.aoa_to_sheet(metricsData);
    metricsWS['!cols'] = [{wch: 25}, {wch: 20}];
    XLSX.utils.book_append_sheet(wb, metricsWS, "Key Metrics");
    
    // Generate filename
    const filename = `PnL_Statement_${getPeriodLabel(period).replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Write the file
    XLSX.writeFile(wb, filename);
    
    console.log('P&L Excel export completed');
}

// Generate P&L Statement from cash flow data
function generatePnLStatement() {
    const selectedPeriod = document.getElementById('pnl-period').value;
    
    // Calculate P&L data
    const pnlData = calculatePnLData(selectedPeriod);
    
    // Display P&L statement
    displayPnLStatement(pnlData);
    
    // Generate charts
    generatePnLCharts(pnlData);
    
    // Generate insights
    generatePnLInsights(pnlData);
}

// Placeholder functions to be implemented
function calculatePnLData(period) {
    console.log('Calculating P&L for period:', period);
    
    // Initialize P&L data structure
    const pnlData = {
        period: period,
        revenue: {
            gross: 0,
            gstOnSales: 0,
            net: 0,
            unitsSold: 0,
            monthlyBreakdown: {
                october: { units: 0, amount: 0 },
                november: { units: 0, amount: 0 },
                december: { units: 0, amount: 0 }
            }
        },
        cogs: {
            materials: {
                steel: 0,
                boughtOut: 0,
                subtotal: 0,
                gst: 0,
                total: 0
            },
            labour: 0,
            total: 0
        },
        grossProfit: 0,
        grossMarginPercent: 0,
        operatingExpenses: {
            fixed: 0
        },
        netProfit: 0,
        netMarginPercent: 0
    };
    
    // DEBUG: Let's see what transactions we have
    console.log('=== DEBUG: Transaction Details ===');
    cashFlowData.forEach(transaction => {
        if (transaction.head === 'Materials' || 
            transaction.head === 'Sales - Full Payment' || 
            transaction.head === 'Sales - Final Payment') {
            console.log(`${transaction.head}: ${transaction.details}`);
        }
    });

    // Get input values for calculations
    const inputs = collectInputValues();
    
    // Process cash flow data to extract P&L information
    cashFlowData.forEach(transaction => {
        const transDate = new Date(transaction.date);
        const month = transDate.getMonth(); // 9=Oct, 10=Nov, 11=Dec
        const monthKey = month === 9 ? 'october' : month === 10 ? 'november' : 'december';
        
        // Track Revenue (when delivered, not when payment received)
        if (transaction.head === 'Sales - Full Payment' || 
            transaction.head === 'Sales - Final Payment') {
            
            // Extract units from transaction details
            const unitsMatch = transaction.details.match(/C\d+U(\d+)-C\d+U(\d+)/);
            let units = 6; // fallback default
            
            if (unitsMatch) {
                const startUnit = parseInt(unitsMatch[1]);  // First capture group
                const endUnit = parseInt(unitsMatch[2]);    // Second capture group
                units = endUnit - startUnit + 1;
                console.log(`Revenue: ${transaction.details}, Units: ${units}`);
            }
            
            const baseAmount = inputs.cashInPerUnit * units;
            pnlData.revenue.gross += baseAmount;
            pnlData.revenue.unitsSold += units;
            
            // Monthly breakdown
            pnlData.revenue.monthlyBreakdown[monthKey].units += units;
            pnlData.revenue.monthlyBreakdown[monthKey].amount += baseAmount;
            
            // GST is not included in P&L - it's a pass-through
            // P&L shows net amounts only
        }
        
        // Track Material Costs
        if (transaction.head === 'Materials') {
            const unitsMatch = transaction.details.match(/C\d+U(\d+)-C\d+U(\d+)/);
            let units = 6; // fallback default
            
            if (unitsMatch) {
                const startUnit = parseInt(unitsMatch[1]);  // First capture group
                const endUnit = parseInt(unitsMatch[2]);    // Second capture group
                units = endUnit - startUnit + 1;
                console.log(`Materials: ${transaction.details}, Units: ${units}`);
            }
            
            const steelCost = inputs.steelCost * units;
            const boughtOutCost = inputs.boughtOutCost * units;
            
            pnlData.cogs.materials.steel += steelCost;
            pnlData.cogs.materials.boughtOut += boughtOutCost;
            
            // GST on materials is input tax credit - not a P&L cost
        }
        
        // Track Labour Costs
        if (transaction.head === 'Labour') {
            pnlData.cogs.labour += transaction.outflow;
        }
        
        // Track Operating Expenses
        if (transaction.head === 'Fixed Costs') {
            pnlData.operatingExpenses.fixed += transaction.outflow;
        }
    });
    
    // Calculate derived values
    pnlData.revenue.net = pnlData.revenue.gross; // GST is on top of this
    
    pnlData.cogs.materials.subtotal = pnlData.cogs.materials.steel + pnlData.cogs.materials.boughtOut;
    pnlData.cogs.materials.total = pnlData.cogs.materials.subtotal;
    pnlData.cogs.total = pnlData.cogs.materials.total + pnlData.cogs.labour;
    
    pnlData.grossProfit = pnlData.revenue.net - pnlData.cogs.total;
    pnlData.grossMarginPercent = (pnlData.grossProfit / pnlData.revenue.net) * 100;
    
    pnlData.netProfit = pnlData.grossProfit - pnlData.operatingExpenses.fixed;
    pnlData.netMarginPercent = (pnlData.netProfit / pnlData.revenue.net) * 100;
    
    // Filter by period if needed
    if (period !== 'oct-dec') {
        // Create a filtered copy for single months
        const filteredData = JSON.parse(JSON.stringify(pnlData)); // Deep clone
        
        // Reset totals
        filteredData.revenue.gross = 0;
        filteredData.revenue.net = 0;
        filteredData.revenue.unitsSold = 0;
        filteredData.revenue.gstOnSales = 0;
        
        // Get data for selected month only
        const monthMap = { 'oct': 'october', 'nov': 'november', 'dec': 'december' };
        const selectedMonth = monthMap[period];
        
        if (selectedMonth) {
            // Revenue for selected month
            filteredData.revenue.gross = filteredData.revenue.monthlyBreakdown[selectedMonth].amount;
            filteredData.revenue.net = filteredData.revenue.gross;
            filteredData.revenue.unitsSold = filteredData.revenue.monthlyBreakdown[selectedMonth].units;
            
            // Recalculate GST for the month
            if (inputs.applyGST) {
                filteredData.revenue.gstOnSales = filteredData.revenue.gross * (inputs.gstRate / 100);
            }
            
            // Materials and labour for the selected month (proportional)
            const monthPercent = filteredData.revenue.monthlyBreakdown[selectedMonth].units / pnlData.revenue.unitsSold;
            
            filteredData.cogs.materials.steel = pnlData.cogs.materials.steel * monthPercent;
            filteredData.cogs.materials.boughtOut = pnlData.cogs.materials.boughtOut * monthPercent;
            filteredData.cogs.materials.gst = pnlData.cogs.materials.gst * monthPercent;
            filteredData.cogs.materials.subtotal = filteredData.cogs.materials.steel + filteredData.cogs.materials.boughtOut;
            filteredData.cogs.materials.total = filteredData.cogs.materials.subtotal + filteredData.cogs.materials.gst;
            
            filteredData.cogs.labour = pnlData.cogs.labour * monthPercent;
            filteredData.cogs.total = filteredData.cogs.materials.total + filteredData.cogs.labour;
            
            // Fixed costs for one month
            filteredData.operatingExpenses.fixed = pnlData.operatingExpenses.fixed / 3;
            
            // Recalculate profits and margins
            filteredData.grossProfit = filteredData.revenue.net - filteredData.cogs.total;
            filteredData.grossMarginPercent = (filteredData.grossProfit / filteredData.revenue.net) * 100 || 0;
            
            filteredData.netProfit = filteredData.grossProfit - filteredData.operatingExpenses.fixed;
            filteredData.netMarginPercent = (filteredData.netProfit / filteredData.revenue.net) * 100 || 0;
        }
        
        // Save P&L data to jvStore
        if (window.jvStore) {
            jvStore.set('pnlData.netProfit', filteredData.netProfit);
            jvStore.set('pnlData.unitsSold', filteredData.revenue.unitsSold);
            jvStore.set('pnlData.grossMargin', filteredData.grossMarginPercent);
            jvStore.set('pnlData.netMargin', filteredData.netMarginPercent);
            console.log('P&L data saved to jvStore');
        }
        
        return filteredData;
    }
    
    // Save P&L data to jvStore (for full quarter)
    if (window.jvStore) {
        jvStore.set('pnlData.netProfit', pnlData.netProfit);
        jvStore.set('pnlData.unitsSold', pnlData.revenue.unitsSold);
        jvStore.set('pnlData.grossMargin', pnlData.grossMarginPercent);
        jvStore.set('pnlData.netMargin', pnlData.netMarginPercent);
        console.log('P&L data saved to jvStore');
    }
    
    return pnlData;
}

function displayPnLStatement(data) {
    console.log('Displaying P&L statement');
    
    const statementContainer = document.querySelector('.statement-container');
    if (!statementContainer) return;
    
    let statementHTML = `
        <table class="pnl-table">
            <thead>
                <tr>
                    <th colspan="2">PROFIT & LOSS STATEMENT</th>
                </tr>
                <tr>
                    <th colspan="2" class="period-header">Period: ${getPeriodLabel(data.period)}</th>
                </tr>
            </thead>
            <tbody>
                <!-- Revenue Section -->
                <tr class="section-header">
                    <td colspan="2">REVENUE</td>
                </tr>
                <tr>
                    <td class="indent-1">Sales Revenue (${data.revenue.unitsSold} units)</td>
                    <td class="amount">${formatCurrency(data.revenue.gross)}</td>
                </tr>`;
    
    // GST is not shown in P&L - it's a balance sheet item
    
    statementHTML += `
                <tr class="total-row">
                    <td>Net Revenue</td>
                    <td class="amount">${formatCurrency(data.revenue.net)}</td>
                </tr>
                
                <!-- COGS Section -->
                <tr class="section-header">
                    <td colspan="2">COST OF GOODS SOLD</td>
                </tr>
                <tr class="subsection">
                    <td class="indent-1">Material Costs</td>
                    <td></td>
                </tr>
                <tr>
                    <td class="indent-2">Steel Materials</td>
                    <td class="amount">${formatCurrency(data.cogs.materials.steel)}</td>
                </tr>
                <tr>
                    <td class="indent-2">Bought-out Materials</td>
                    <td class="amount">${formatCurrency(data.cogs.materials.boughtOut)}</td>
                </tr>`;
    
   // GST input credit is not shown in P&L
    
    statementHTML += `
                <tr class="subtotal">
                    <td class="indent-1">Total Material Costs</td>
                    <td class="amount">${formatCurrency(data.cogs.materials.total)}</td>
                </tr>
                <tr>
                    <td class="indent-1">Direct Labour</td>
                    <td class="amount">${formatCurrency(data.cogs.labour)}</td>
                </tr>
                <tr class="total-row">
                    <td>Total COGS</td>
                    <td class="amount">${formatCurrency(data.cogs.total)}</td>
                </tr>
                
                <!-- Gross Profit -->
                <tr class="gross-profit">
                    <td>GROSS PROFIT</td>
                    <td class="amount ${data.grossProfit >= 0 ? 'positive' : 'negative'}">${formatCurrency(data.grossProfit)}</td>
                </tr>
                <tr>
                    <td class="indent-1 metric">Gross Margin %</td>
                    <td class="amount metric">${data.grossMarginPercent.toFixed(1)}%</td>
                </tr>
                
                <!-- Operating Expenses -->
                <tr class="section-header">
                    <td colspan="2">OPERATING EXPENSES</td>
                </tr>
                <tr>
                    <td class="indent-1">Fixed Monthly Costs</td>
                    <td class="amount">${formatCurrency(data.operatingExpenses.fixed)}</td>
                </tr>
                <tr class="total-row">
                    <td>Total Operating Expenses</td>
                    <td class="amount">${formatCurrency(data.operatingExpenses.fixed)}</td>
                </tr>
                
                <!-- Net Profit -->
                <tr class="net-profit">
                    <td>NET PROFIT BEFORE TAX</td>
                    <td class="amount ${data.netProfit >= 0 ? 'positive' : 'negative'}">${formatCurrency(data.netProfit)}</td>
                </tr>
                <tr>
                    <td class="indent-1 metric">Net Margin %</td>
                    <td class="amount metric">${data.netMarginPercent.toFixed(1)}%</td>
                </tr>
            </tbody>
        </table>
    `;
    
    statementContainer.innerHTML = statementHTML;
}

// Helper function to get period label
function getPeriodLabel(period) {
    const labels = {
        'oct-dec': 'October - December 2025',
        'oct': 'October 2025',
        'nov': 'November 2025',
        'dec': 'December 2025'
    };
    return labels[period] || period;
}

function generatePnLCharts(data) {
    console.log('Generating P&L charts');
    
    // Destroy existing charts if they exist
    if (window.pnlCharts) {
        Object.values(window.pnlCharts).forEach(chart => chart.destroy());
    }
    window.pnlCharts = {};
    
    // 1. Cost Breakdown Pie Chart
    const costCtx = document.getElementById('costBreakdownChart');
    if (costCtx) {
        window.pnlCharts.cost = new Chart(costCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Materials', 'Labour', 'Fixed Costs'],
                datasets: [{
                    data: [
                        data.cogs.materials.total,
                        data.cogs.labour,
                        data.operatingExpenses.fixed
                    ],
                    backgroundColor: [
                        '#66FCF1',
                        '#45A29E',
                        '#C5C6C7'
                    ],
                    borderColor: '#1F2833',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#C5C6C7',
                            padding: 10,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return context.label + ': ' + formatCurrency(value) + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 2. Monthly Revenue Trend Bar Chart
    const revenueCtx = document.getElementById('revenueTrendChart');
    if (revenueCtx) {
        window.pnlCharts.revenue = new Chart(revenueCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['October', 'November', 'December'],
                datasets: [{
                    label: 'Revenue',
                    data: [
                        data.revenue.monthlyBreakdown.october.amount,
                        data.revenue.monthlyBreakdown.november.amount,
                        data.revenue.monthlyBreakdown.december.amount
                    ],
                    backgroundColor: '#66FCF1',
                    borderColor: '#45A29E',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const month = context.label;
                                const monthKey = month.toLowerCase();
                                const units = data.revenue.monthlyBreakdown[monthKey].units;
                                return [
                                    'Revenue: ' + formatCurrency(context.parsed.y),
                                    'Units: ' + units
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(69, 162, 158, 0.1)' },
                        ticks: {
                            color: '#8B8C8D',
                            callback: function(value) {
                                return '₹' + (value / 100000).toFixed(0) + 'L';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#8B8C8D' }
                    }
                }
            }
        });
    }
    
    // 3. Profit Margin Trend Line Chart
    const marginCtx = document.getElementById('marginTrendChart');
    if (marginCtx) {
        // Calculate monthly margins (simplified for now)
        const monthlyMargins = calculateMonthlyMargins(data);
        
        window.pnlCharts.margin = new Chart(marginCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['October', 'November', 'December'],
                datasets: [{
                    label: 'Gross Margin %',
                    data: monthlyMargins.gross,
                    borderColor: '#66FCF1',
                    backgroundColor: 'rgba(102, 252, 241, 0.1)',
                    tension: 0.3,
                    fill: true
                }, {
                    label: 'Net Margin %',
                    data: monthlyMargins.net,
                    borderColor: '#45A29E',
                    backgroundColor: 'rgba(69, 162, 158, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#C5C6C7',
                            padding: 10,
                            font: { size: 12 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(69, 162, 158, 0.1)' },
                        ticks: {
                            color: '#8B8C8D',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#8B8C8D' }
                    }
                }
            }
        });
    }
}

// Helper function to calculate monthly margins
function calculateMonthlyMargins(data) {
    // For now, using overall margin for all months
    // In a real implementation, you'd calculate per month
    return {
        gross: [data.grossMarginPercent, data.grossMarginPercent, data.grossMarginPercent],
        net: [data.netMarginPercent, data.netMarginPercent, data.netMarginPercent]
    };
}

function generatePnLInsights(data) {
    console.log('Generating P&L insights');
    
    const insightsContainer = document.querySelector('.insights-container');
    if (!insightsContainer) return;
    
    const insights = [];
    
    // 1. Gross Margin Analysis
    if (data.grossMarginPercent > 20) {
        insights.push({
            type: 'positive',
            icon: '✓',
            text: `Strong gross margin of ${data.grossMarginPercent.toFixed(1)}% indicates healthy unit economics`
        });
    } else if (data.grossMarginPercent > 10) {
        insights.push({
            type: 'neutral',
            icon: '→',
            text: `Gross margin of ${data.grossMarginPercent.toFixed(1)}% is moderate - consider optimizing material costs`
        });
    } else {
        insights.push({
            type: 'negative',
            icon: '!',
            text: `Low gross margin of ${data.grossMarginPercent.toFixed(1)}% requires immediate attention`
        });
    }
    
    // 2. Revenue Growth Analysis
    const octRev = data.revenue.monthlyBreakdown.october.amount;
    const decRev = data.revenue.monthlyBreakdown.december.amount;
    if (decRev > 0 && octRev > 0) {
        const growth = ((decRev - octRev) / octRev * 100).toFixed(0);
        if (growth > 0) {
            insights.push({
                type: 'positive',
                icon: '↑',
                text: `Revenue grew ${growth}% from October to December, showing positive momentum`
            });
        }
    }
    
    // 3. Fixed Cost Efficiency
    const fixedCostPercent = (data.operatingExpenses.fixed / data.revenue.net * 100).toFixed(1);
    if (fixedCostPercent < 10) {
        insights.push({
            type: 'positive',
            icon: '✓',
            text: `Fixed costs at ${fixedCostPercent}% of revenue demonstrate excellent operating leverage`
        });
    } else if (fixedCostPercent < 20) {
        insights.push({
            type: 'neutral',
            icon: '→',
            text: `Fixed costs represent ${fixedCostPercent}% of revenue - reasonable but room for improvement`
        });
    } else {
        insights.push({
            type: 'negative',
            icon: '!',
            text: `High fixed costs at ${fixedCostPercent}% of revenue may impact profitability`
        });
    }
    
    // 4. Unit Economics
    const avgRevenuePerUnit = data.revenue.gross / data.revenue.unitsSold;
    const avgCostPerUnit = data.cogs.total / data.revenue.unitsSold;
    const profitPerUnit = avgRevenuePerUnit - avgCostPerUnit;
    
    insights.push({
        type: 'info',
        icon: '₹',
        text: `Average profit per unit: ${formatCurrency(profitPerUnit)} (Revenue: ${formatCurrency(avgRevenuePerUnit)} - COGS: ${formatCurrency(avgCostPerUnit)})`
    });
    
    // 5. Net Profitability
    if (data.netProfit > 0) {
        insights.push({
            type: 'positive',
            icon: '✓',
            text: `Net profit of ${formatCurrency(data.netProfit)} (${data.netMarginPercent.toFixed(1)}% margin) shows healthy business performance`
        });
    } else {
        insights.push({
            type: 'negative',
            icon: '!',
            text: `Net loss of ${formatCurrency(Math.abs(data.netProfit))} requires strategic review`
        });
    }
    
    // Generate HTML for insights
    let insightsHTML = '<ul class="insights-list">';
    insights.forEach(insight => {
        insightsHTML += `
            <li class="insight-item ${insight.type}">
                <span class="insight-icon">${insight.icon}</span>
                <span class="insight-text">${insight.text}</span>
            </li>
        `;
    });
    insightsHTML += '</ul>';
    
    insightsContainer.innerHTML = insightsHTML;
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
    
    // Update the Partner B investment in summary
    document.getElementById('partner-investment').textContent = formatCurrency(partnerInvestment);
    
    // Second pass: Calculate with Partner B investment
    cashFlowData = calculateCashFlows(inputs, partnerInvestment);
    
    // Calculate summary data
    calculateSummary();
    
    // Save to jvStore for other sections to use
    if (window.jvStore) {
        jvStore.set('partnerBInvestment', summaryData.partnerInvestment);
        jvStore.set('totalCashInflow', summaryData.totalInflow);
        jvStore.set('totalCashOutflow', summaryData.totalOutflow);
        jvStore.set('finalBalance', summaryData.finalBalance);
        jvStore.set('minBalance', summaryData.minBalance);
        
        // Also update Partner BC's working capital contribution
        jvStore.set('contributions.partnerBC.workingCapital', summaryData.partnerInvestment);
        
        console.log('Cash flow data saved to jvStore');
    }
    
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
    
    while (currentDay <= totalDays && cycleNumber <= 13) {
        // Determine order quantity based on cycle number
        let orderQty;
        if (cycleNumber <= 4) {
            orderQty = inputs.orderQuantities.month1;
        } else if (cycleNumber <= 8) {
            orderQty = inputs.orderQuantities.month2;
        } else if (cycleNumber <= 13) {
            orderQty = inputs.orderQuantities.month3;
        } else {
            orderQty = inputs.orderQuantities.month3; // Default to month3 for any extra cycles
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
            deliveryDay: orderNumber === 1 ? orderDay : orderDay, // Orders align with cycle completion
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
    let pendingPayments = [];
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

        // Process any pending payments due today
        const dueToday = pendingPayments.filter(p => {
            const pDate = new Date(p.date);
            return pDate.getDate() === currentDate.getDate() && 
                   pDate.getMonth() === currentDate.getMonth() && 
                   pDate.getFullYear() === currentDate.getFullYear();
        });

        dueToday.forEach(payment => {
            balance += payment.amount;
            transactions.push({
                date: new Date(currentDate),
                day: dayCount,
                details: payment.details + ' (Delayed Receipt)',
                head: payment.head,
                outflow: 0,
                inflow: payment.amount,
                balance: balance
            });
        });

        // Remove processed payments from pending
        pendingPayments = pendingPayments.filter(p => !dueToday.includes(p));

        // Check for order arrivals and payments based on cycles
        if (dayCount === inputs.initialOrderDay) {
            // Day 8: First order with full payment (special case)
            const order = orders[0];
            const revenue = inputs.cashInPerUnit * order.quantity;
            const gstAmount = inputs.applyGST ? revenue * (inputs.gstRate / 100) : 0;
            const totalRevenue = revenue + gstAmount;
            
            if (inputs.applyDelay && inputs.finalDelayDays > 0) {
                // Delay the payment
                const paymentDate = addWorkingDays(currentDate, inputs.finalDelayDays, startDate);
                pendingPayments.push({
                    date: paymentDate,
                    details: `Order 1 - Full Payment - C01U001-C01U${String(order.quantity).padStart(3, '0')}`,
                    head: 'Sales - Full Payment',
                    amount: totalRevenue
                });
            } else {
                // Process immediately
                balance += totalRevenue;
                transactions.push({
                    date: new Date(currentDate),
                    day: dayCount,
                    details: `Order 1 - Full Payment - C01U001-C01U${String(order.quantity).padStart(3, '0')}`,
                    head: 'Sales - Full Payment',
                    outflow: 0,
                    inflow: totalRevenue,
                    balance: balance
                });
            }
        }

        // For subsequent cycles: 50% advance on cycle start (Day 1 of cycle)
        const startingCycle = productionCycles.find(c => c.startDay === dayCount && c.cycleNumber > 1);
        if (startingCycle) {
            const order = orders.find(o => o.cycleNumber === startingCycle.cycleNumber);
            if (order) {
                const advancePayment = inputs.cashInPerUnit * order.quantity * 0.5;
                const gstAmount = inputs.applyGST ? advancePayment * (inputs.gstRate / 100) : 0;
                const totalAdvance = advancePayment + gstAmount;
                
                if (inputs.applyDelay && inputs.advanceDelayDays > 0) {
                    // Delay the advance payment
                    const paymentDate = addWorkingDays(currentDate, inputs.advanceDelayDays, startDate);
                    pendingPayments.push({
                        date: paymentDate,
                        details: `Order ${order.orderNumber} - Advance Payment (50%) for ${startingCycle.unitsProduced}`,
                        head: 'Sales - Advance',
                        amount: totalAdvance
                    });
                } else {
                    // Process immediately
                    balance += totalAdvance;
                    transactions.push({
                        date: new Date(currentDate),
                        day: dayCount,
                        details: `Order ${order.orderNumber} - Advance Payment (50%) for ${startingCycle.unitsProduced}`,
                        head: 'Sales - Advance',
                        outflow: 0,
                        inflow: totalAdvance,
                        balance: balance
                    });
                }
            }
        }

        // 50% final payment on cycle end (Day 7 of cycle)
        const endingCycle = productionCycles.find(c => c.endDay === dayCount && c.cycleNumber > 1);
        if (endingCycle) {
            const order = orders.find(o => o.cycleNumber === endingCycle.cycleNumber);
            if (order) {
                const finalPayment = inputs.cashInPerUnit * order.quantity * 0.5;
                const gstAmount = inputs.applyGST ? finalPayment * (inputs.gstRate / 100) : 0;
                const totalFinal = finalPayment + gstAmount;
                
                if (inputs.applyDelay && inputs.finalDelayDays > 0) {
                    // Delay the final payment
                    const paymentDate = addWorkingDays(currentDate, inputs.finalDelayDays, startDate);
                    pendingPayments.push({
                        date: paymentDate,
                        details: `Order ${order.orderNumber} - Final Payment (50%) on Delivery - ${endingCycle.unitsProduced}`,
                        head: 'Sales - Final Payment',
                        amount: totalFinal
                    });
                } else {
                    // Process immediately
                    balance += totalFinal;
                    transactions.push({
                        date: new Date(currentDate),
                        day: dayCount,
                        details: `Order ${order.orderNumber} - Final Payment (50%) on Delivery - ${endingCycle.unitsProduced}`,
                        head: 'Sales - Final Payment',
                        outflow: 0,
                        inflow: totalFinal,
                        balance: balance
                    });
                }
            }
        }      
       
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
    
    // Final settlement on Dec 31 - Actually pay December labour and fixed costs
    if (dayCount === totalDays) {
        const lastDate = new Date(endDate);
        const lastMonth = lastDate.getMonth();
        const lastYear = lastDate.getFullYear();
        const lastMonthKey = `${lastYear}-${lastMonth}`;
        const unitsInDecember = monthlyProduction[lastMonthKey] || 0;

        // Settle any remaining pending payments that are due AFTER Dec 31
        if (pendingPayments.length > 0) {
            const futurePayments = pendingPayments.filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate > currentDate; // Only payments due after Dec 31
            });
            
            futurePayments.forEach(payment => {
                balance += payment.amount;
                transactions.push({
                    date: new Date(currentDate),
                    day: dayCount,
                    details: payment.details + ' (Year-end Settlement)',
                    head: payment.head,
                    outflow: 0,
                    inflow: payment.amount,
                    balance: balance
                });
            });
            
            // Clear only the future payments we processed
            pendingPayments = pendingPayments.filter(p => !futurePayments.includes(p));
        }
        
        // December labour cost
        if (unitsInDecember > 0) {
            const labourCost = inputs.labourCost * unitsInDecember;
            balance -= labourCost;
            
            transactions.push({
                date: new Date(endDate),
                day: totalDays,
                details: `Labour Cost Payment for ${unitsInDecember} units produced in December ${lastYear} (Year-end settlement)`,
                head: 'Labour',
                outflow: labourCost,
                inflow: 0,
                balance: balance
            });
        }
        
        // December fixed costs
        balance -= inputs.fixedCosts;
        transactions.push({
            date: new Date(endDate),
            day: totalDays,
            details: `Fixed Monthly Costs - December ${lastYear} (Year-end settlement)`,
            head: 'Fixed Costs',
            outflow: inputs.fixedCosts,
            inflow: 0,
            balance: balance
        });
    }
    } // This is the closing brace of the for loop
    
    // Sort transactions to ensure inflows come before outflows on the same date
    transactions.sort((a, b) => {
        // First sort by date
        const dateCompare = new Date(a.date) - new Date(b.date);
        if (dateCompare !== 0) return dateCompare;
        
        // If same date, inflows come first (inflow > 0 comes before inflow = 0)
        return b.inflow - a.inflow;
    });
    
    // Recalculate all balances after sorting
    let recalcBalance = inputs.initialBalance;
    transactions.forEach(transaction => {
        recalcBalance += transaction.inflow - transaction.outflow;
        transaction.balance = recalcBalance;
    });
    
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
    
    tableContainer.innerHTML = `
        <div class="table-wrapper">
            ${tableHTML}
        </div>
    `;
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
        advanceDelayDays: parseInt(document.getElementById('advance-delay-days').value) || 0,
        finalDelayDays: parseInt(document.getElementById('final-delay-days').value) || 0
    };
}

// Export to Excel function
function exportToExcel() {
    console.log('Exporting to Excel...');

    // Debug: Check if XLSX is available
    if (typeof XLSX === 'undefined') {
        alert('Excel export library not loaded. Please refresh the page and try again.');
        console.error('XLSX is not defined');
        return;
    }
    
    if (cashFlowData.length === 0) {
        alert('Please run the simulation first');
        return;
    }
    
    try{
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        console.log('Workbook created:', wb);    
        
        // 1. Summary Sheet
        const summarySheetData = [
            ['Working Capital Calculator - Summary'],
            ['Generated on:', new Date().toLocaleDateString()],
            [''],
            ['Key Metrics'],
            ['Partner B Investment:', summaryData.partnerInvestment],
            ['Total Cash Inflow:', summaryData.totalInflow],
            ['Total Cash Outflow:', summaryData.totalOutflow],
            ['Minimum Balance:', summaryData.minBalance],
            ['Final Balance:', summaryData.finalBalance]
        ];
        const summaryWS = XLSX.utils.aoa_to_sheet(summarySheetData);
        XLSX.utils.book_append_sheet(wb, summaryWS, "Summary");
        
        // 2. Cash Flow Sheet
        const cashFlowHeaders = ['Date', 'Day', 'Transaction Details', 'Transaction Head', 'Cash Outflow', 'Cash Inflow', 'Balance'];
        const cashFlowRows = cashFlowData.map(row => [
            formatDate(row.date),
            row.day,
            row.details,
            row.head,
            row.outflow || 0,
            row.inflow || 0,
            row.balance
        ]);
        
        const cashFlowDataForExcel = [cashFlowHeaders, ...cashFlowRows];
        const cashFlowWS = XLSX.utils.aoa_to_sheet(cashFlowDataForExcel);
        
        // Set column widths
        cashFlowWS['!cols'] = [
            {wch: 12}, // Date
            {wch: 6},  // Day
            {wch: 50}, // Transaction Details
            {wch: 20}, // Transaction Head
            {wch: 15}, // Cash Outflow
            {wch: 15}, // Cash Inflow
            {wch: 15}  // Balance
        ];
        
        XLSX.utils.book_append_sheet(wb, cashFlowWS, "Cash Flow");
        
        // 3. Input Parameters Sheet
        const inputs = collectInputValues();
        const inputData = [
            ['Input Parameters'],
            [''],
            ['Project Setup'],
            ['Start Date:', inputs.startDate],
            ['Initial Balance:', inputs.initialBalance],
            [''],
            ['Order Quantities'],
            ['October (Cycles 1-4):', inputs.orderQuantities.month1],
            ['November (Cycles 5-8):', inputs.orderQuantities.month2],
            ['December (Cycles 9-13):', inputs.orderQuantities.month3],
            [''],
            ['Costs'],
            ['Steel Cost per Unit:', inputs.steelCost],
            ['Bought-out Cost per Unit:', inputs.boughtOutCost],
            ['Labour Cost per Unit:', inputs.labourCost],
            ['Fixed Monthly Costs:', inputs.fixedCosts],
            [''],
            ['Revenue'],
            ['Cash In Per Unit:', inputs.cashInPerUnit],
            [''],
            ['Settings'],
            ['GST Applied:', inputs.applyGST ? 'Yes' : 'No'],
            ['GST Rate:', inputs.applyGST ? inputs.gstRate + '%' : 'N/A'],
            ['Payment Delay Applied:', inputs.applyDelay ? 'Yes' : 'No'],
            ['Advance Delay Days:', inputs.applyDelay ? inputs.advanceDelayDays : 'N/A'],
            ['Final Delay Days:', inputs.applyDelay ? inputs.finalDelayDays : 'N/A']
        ];
        
        const inputWS = XLSX.utils.aoa_to_sheet(inputData);
        inputWS['!cols'] = [{wch: 30}, {wch: 20}];
        XLSX.utils.book_append_sheet(wb, inputWS, "Input Parameters");
        
        // Generate filename with date
        const filename = `Working_Capital_Calculator_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        // Write the file
        XLSX.writeFile(wb, filename);
        } catch (error) {
            console.error('Error during Excel export:', error);
            alert('Error exporting to Excel: ' + error.message);
    }
    console.log('Excel export completed');
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
                    pointBackgroundColor: function(context) {
                        const value = context.parsed.y;
                        return value <= 0 ? '#FC6666' : '#66FCF1';
                    },
                    pointBorderColor: '#45A29E',
                    pointRadius: function(context) {
                        const value = context.parsed.y;
                        return value <= 0 ? 4 : 3;  // Slightly larger when zero/negative
                    },
                    pointHoverRadius: 6,
                    tension: 0.1,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'point',
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
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            const dateKey = context.label;
                            const datasetLabel = context.dataset.label;
                            
                            if (datasetLabel === 'Cash Inflow') {
                                // Get all inflow transactions for this date
                                const inflowTrans = cashFlowData.filter(t => 
                                    formatDate(t.date) === dateKey && t.inflow > 0
                                );
                                
                                if (inflowTrans.length === 0) return 'No inflow';
                                
                                const labels = ['Cash Inflow:'];
                                inflowTrans.forEach(t => {
                                    labels.push(`  ${t.head}: ${formatCurrency(t.inflow)}`);
                                });
                                labels.push(`  Total: ₹${Math.abs(context.parsed.y).toFixed(2)} L`);
                                return labels;
                                
                            } else if (datasetLabel === 'Cash Outflow') {
                                // Get all outflow transactions for this date
                                const outflowTrans = cashFlowData.filter(t => 
                                    formatDate(t.date) === dateKey && t.outflow > 0
                                );
                                
                                if (outflowTrans.length === 0) return 'No outflow';
                                
                                const labels = ['Cash Outflow:'];
                                outflowTrans.forEach(t => {
                                    labels.push(`  ${t.head}: ${formatCurrency(t.outflow)}`);
                                });
                                labels.push(`  Total: ₹${Math.abs(context.parsed.y).toFixed(2)} L`);
                                return labels;
                                
                            } else {
                                // Balance line
                                return `Balance: ₹${context.parsed.y.toFixed(2)} L`;
                            }
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