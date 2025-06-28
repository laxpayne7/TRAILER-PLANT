// === Sidebar Toggle & Navigation ===
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const allSections = document.querySelectorAll(".content-section");
  const navItems = document.querySelectorAll(".sidebar li[data-section]");
  const collapsible = document.querySelector(".sidebar .collapsible");
  const submenu = document.querySelector(".submenu");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  collapsible.addEventListener("click", () => {
    collapsible.classList.toggle("open");
  });

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-section");

      // Toggle active state in nav
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Show the target section
      allSections.forEach(section => {
        section.classList.remove("active");
      });
      const target = document.getElementById(targetId);
      if (target) target.classList.add("active");
    });
  });

  // === Section 1: Save Overview & Setup Form ===
  const form = document.getElementById("overview-setup-form");
  if (form) {
    const fields = [
      "jv-name", "partner-a", "partner-b", "partner-c",
      "start-date", "capex", "working-capital", "location"
    ];

    // Pre-fill values from localStorage
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (input && localStorage.getItem(id)) {
        input.value = localStorage.getItem(id);
      }
    });

    // Save on submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fields.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          localStorage.setItem(id, input.value);
        }
      });
      alert("JV Setup Details Saved ✅");
    });
  }
    
  // === Section 3: Connect to jvStore ===
  // Auto-update Partner BC's working capital when simulator runs
  function updateContributionTable() {
    const partnerBInvestment = jvStore.get('partnerBInvestment');
    const wcInput = document.getElementById('wc-bc');
    
    if (wcInput && partnerBInvestment > 0) {
      wcInput.value = partnerBInvestment;
      console.log('Updated Partner BC Working Capital:', partnerBInvestment);
      
      // Manually trigger the input event to update jvStore
      const event = new Event('input', { bubbles: true });
      wcInput.dispatchEvent(event);
    }
  }
  
  // Calculate and display equity percentages
  function updateEquityDisplay() {
    const equity = jvStore.calculateEquity();
    const contributions = jvStore.calculateTotalContributions();
    
    console.log('Equity Split:', equity);
    
    // Update equity percentage displays
    const equityA = document.getElementById('equity-a');
    const equityBC = document.getElementById('equity-bc');
    const contribA = document.getElementById('contrib-a');
    const contribBC = document.getElementById('contrib-bc');
    const totalContrib = document.getElementById('total-contributions');
    
    if (equityA) equityA.textContent = equity.partnerA + '%';
    if (equityBC) equityBC.textContent = equity.partnerBC + '%';
    
    if (contribA) contribA.textContent = contributions.partnerA.toLocaleString('en-IN');
    if (contribBC) contribBC.textContent = contributions.partnerBC.toLocaleString('en-IN');
    
    if (totalContrib) {
      totalContrib.textContent = contributions.total.toLocaleString('en-IN');
    }
    
    // Update horizontal bar visual
    const barA = document.getElementById('bar-a');
    const barBC = document.getElementById('bar-bc');
    const barALabel = document.getElementById('bar-a-label');
    const barBCLabel = document.getElementById('bar-bc-label');
    
    if (barA && barBC) {
      barA.style.width = equity.partnerA + '%';
      barBC.style.left = equity.partnerA + '%';
      barBC.style.width = equity.partnerBC + '%';
      
      // Show/hide labels based on bar width
      if (barALabel) {
        barALabel.textContent = equity.partnerA + '%';
        barALabel.style.display = parseFloat(equity.partnerA) > 10 ? 'block' : 'none';
      }
      if (barBCLabel) {
        barBCLabel.textContent = equity.partnerBC + '%';
        barBCLabel.style.display = parseFloat(equity.partnerBC) > 10 ? 'block' : 'none';
      }
    }
    
    // Generate ruler scale
    generateRulerScale(contributions.total);
    
    // Calculate profit distributions
    calculateProfitDistributions(equity);
  }
  
  // Generate dynamic ruler scale based on total contributions
  function generateRulerScale(total) {
    const rulerMarks = document.getElementById('ruler-marks');
    if (!rulerMarks) return;
  
    // Avoid divide-by-zero issues
    if (total <= 0) {
      rulerMarks.innerHTML = '';
      return;
    }
    
    rulerMarks.innerHTML = '';
    
    // Determine scale intervals
    let interval, decimals;
    if (total <= 1000000) { // Up to 10L
      interval = 200000; // 2L intervals
      decimals = 0;
    } else if (total <= 10000000) { // Up to 1Cr
      interval = 1000000; // 10L intervals
      decimals = 0;
    } else if (total <= 100000000) { // Up to 10Cr
      interval = 10000000; // 1Cr intervals
      decimals = 1;
    } else {
      interval = 50000000; // 5Cr intervals
      decimals = 1;
    }
    
    // Generate marks
    for (let value = 0; value <= total; value += interval) {
      const percent = (value / total) * 100;
      const mark = document.createElement('div');
      mark.style.cssText = `
        position: absolute;
        left: ${percent}%;
        bottom: 0;
        transform: translateX(-50%);
      `;
      
      // Tick mark
      const tick = document.createElement('div');
      tick.style.cssText = `
        width: 1px;
        height: 8px;
        background: var(--text-muted);
        margin: 0 auto;
      `;
      mark.appendChild(tick);
      
      // Label
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 0.7rem;
        color: var(--text-muted);
        margin-top: 2px;
        white-space: nowrap;
      `;
      
      // Format label
      if (value === 0) {
        label.textContent = '0';
      } else if (value >= 10000000) {
        label.textContent = (value / 10000000).toFixed(decimals) + ' Cr';
      } else {
        label.textContent = (value / 100000).toFixed(0) + ' L';
      }
      
      mark.appendChild(label);
      rulerMarks.appendChild(mark);
    }
  }
  
  // Calculate profit distributions based on equity
  function calculateProfitDistributions(equity) {
    // Get net profit from P&L (stored in jvStore)
    let quarterlyNetProfit = jvStore.get('pnlData.netProfit') || 0;
    
    // If no P&L data yet, use default assumption
    if (quarterlyNetProfit === 0) {
      // Default: 78 units at approx 61k profit per unit = 48L quarterly
      quarterlyNetProfit = 4800000;
    }
    
    // Calculate distributions
    const distributions = {
      monthly: quarterlyNetProfit / 3,      // Quarterly divided by 3
      quarterly: quarterlyNetProfit,         // Direct from P&L
      annual: quarterlyNetProfit * 4        // Quarterly multiplied by 4
    };
    
    // Update Partner A values
    const monthlyA = document.getElementById('monthly-a');
    const quarterlyA = document.getElementById('quarterly-a');
    const annualA = document.getElementById('annual-a');
    
    if (monthlyA) monthlyA.textContent = Math.round(distributions.monthly * equity.partnerA / 100).toLocaleString('en-IN');
    if (quarterlyA) quarterlyA.textContent = Math.round(distributions.quarterly * equity.partnerA / 100).toLocaleString('en-IN');
    if (annualA) annualA.textContent = Math.round(distributions.annual * equity.partnerA / 100).toLocaleString('en-IN');
    
    // Update Partner BC values
    const monthlyBC = document.getElementById('monthly-bc');
    const quarterlyBC = document.getElementById('quarterly-bc');
    const annualBC = document.getElementById('annual-bc');
    
    if (monthlyBC) monthlyBC.textContent = Math.round(distributions.monthly * equity.partnerBC / 100).toLocaleString('en-IN');
    if (quarterlyBC) quarterlyBC.textContent = Math.round(distributions.quarterly * equity.partnerBC / 100).toLocaleString('en-IN');
    if (annualBC) annualBC.textContent = Math.round(distributions.annual * equity.partnerBC / 100).toLocaleString('en-IN');
    
    // Update quarterly profit display
    const quarterlyProfitDisplay = document.getElementById('quarterly-net-profit');
    if (quarterlyProfitDisplay) quarterlyProfitDisplay.textContent = quarterlyNetProfit.toLocaleString('en-IN');
    
    // Calculate ROI and Payback Period
    const contributions = jvStore.calculateTotalContributions();
    const totalInvestment = contributions.total;
    const annualProfit = distributions.annual;
    
    // Annual ROI = (Annual Profit / Total Investment) * 100
    const annualROI = totalInvestment > 0 ? (annualProfit / totalInvestment * 100).toFixed(1) : 0;
    
    // Payback Period = Total Investment / Annual Profit
    const paybackPeriod = annualProfit > 0 ? (totalInvestment / annualProfit).toFixed(1) : 0;
    
    // Update ROI displays
    const roiDisplay = document.getElementById('annual-roi');
    const paybackDisplay = document.getElementById('payback-period');
    
    if (roiDisplay) roiDisplay.textContent = annualROI + '%';
    if (paybackDisplay) paybackDisplay.textContent = paybackPeriod + ' years';
  }
  
  // Initialize default values on page load
  updateEquityDisplay();  
  
  // Listen for jvStore changes
  jvStore.subscribe(function(key, value) {
    if (key === 'partnerBInvestment') {
      updateContributionTable();
    }
  });

  // === Section 3: Track All Contribution Inputs ===
  // Save contribution values when they change
  const contributionInputs = {
      'capex-a': 'contributions.partnerA.capex',
      'wc-bc': 'contributions.partnerBC.workingCapital',
      'market-ops-bc': 'contributions.partnerBC.marketOpsValue'
  };
  
  Object.keys(contributionInputs).forEach(inputId => {
      const input = document.getElementById(inputId);
      if (input) {
          input.addEventListener('input', function() {
              const value = parseFloat(this.value) || 0;
              jvStore.set(contributionInputs[inputId], value);
              updateEquityDisplay();
          });
      }
  });

  // === jvStore Test Function ===
  // This helps us verify data is flowing correctly
  window.testJVStore = function() {
    console.log('=== jvStore Test ===');
    console.log('Current Store Data:', jvStore.getAll());
    console.log('Partner B Investment:', jvStore.get('partnerBInvestment'));
    console.log('Total Contributions:', jvStore.calculateTotalContributions());
    console.log('Equity Split:', jvStore.calculateEquity());
    console.log('===================');
  };

  console.log('Test function ready. Run testJVStore() in console to see data.');
  
  // === Calculator Module Functions ===
  window.showCalculatorTab = function(tabName) {
    // Hide all calculator tabs
    const allTabs = document.querySelectorAll('.calculator-tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all calculator buttons
    const allButtons = document.querySelectorAll('.calculator-tab-button');
    allButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
      selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
  };
  
  window.initializeCalculatorModule = async function() {
    // Load calculator components
    const loadComponent = async (file, targetId) => {
      try {
        const response = await fetch(file);
        const html = await response.text();
        const target = document.getElementById(targetId);
        if (target) {
          target.innerHTML = html;
        }
      } catch (error) {
        console.error('Error loading component:', error);
      }
    };
    
    // Load all three calculator components
    await loadComponent('modules/calculator/components/cashflow-form.html', 'cashflow-tab');
    await loadComponent('modules/calculator/components/pnl-statement.html', 'pnl-tab');
    await loadComponent('modules/calculator/components/balance-sheet.html', 'balance-tab');
    
    // Initialize calculator functionality after components are loaded
    if (typeof initializeCashFlowForm === 'function') {
      initializeCashFlowForm();
    }
    if (typeof initializePnLStatement === 'function') {
      initializePnLStatement();
    }
    if (typeof initializeBalanceSheet === 'function') {
      initializeBalanceSheet();
    }
  };
});