// === JV Store - Central Data Management ===
// This file manages all shared data between sections

const jvStore = {
  // Store all our data here
  data: {
    // From Section 2: Working Capital Simulator
    partnerBInvestment: 0,
    totalCashInflow: 0,
    totalCashOutflow: 0,
    finalBalance: 0,
    minBalance: 0,
    
    // From Section 1: Overview & Setup
    jvName: '',
    partnerA: '',
    partnerB: '',
    partnerC: '',
    startDate: '',
    
    // From Section 3: Contribution & Equity
    contributions: {
      partnerA: {
        capex: 20000000  // Default 2 Cr
      },
      partnerBC: {
        workingCapital: 0,
        marketOpsValue: 5000000,  // Default 50L
        renovation: 5000000  // Default 50L
      }
    },
    
    // From P&L Statement
    pnlData: {
      netProfit: 0,  // Quarterly net profit
      unitsSold: 0,  // Units sold in quarter
      grossMargin: 0,
      netMargin: 0
    }
  },
  
  // List of functions to call when data changes
  listeners: [],
  
  // Get a value from the store
  get(key) {
    // Split the key by dots to handle nested values
    // Example: 'contributions.partnerA.capex'
    const keys = key.split('.');
    let value = this.data;
    
    for (let k of keys) {
      value = value[k];
      if (value === undefined) return null;
    }
    
    return value;
  },
  
  // Set a value in the store
  set(key, value) {
    // Split the key by dots to handle nested values
    const keys = key.split('.');
    let obj = this.data;
    
    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    
    // Set the value
    obj[keys[keys.length - 1]] = value;
    
    // Notify all listeners that data changed
    this.notifyListeners(key, value);
    
    // Log for debugging
    console.log(`jvStore: Set ${key} = ${value}`);
  },
  
  // Add a function to be called when data changes
  subscribe(listener) {
    this.listeners.push(listener);
  },
  
  // Notify all listeners about a change
  notifyListeners(key, value) {
    this.listeners.forEach(listener => {
      listener(key, value);
    });
  },
  
  // Get all data (useful for debugging)
  getAll() {
    return this.data;
  },
  
  // Calculate total contributions for each partner
  calculateTotalContributions() {
    const totals = {
      partnerA: this.get('contributions.partnerA.capex') || 0,
      partnerBC: (this.get('contributions.partnerBC.workingCapital') || 0) + 
                 (this.get('contributions.partnerBC.marketOpsValue') || 0) +
                 (this.get('contributions.partnerBC.renovation') || 0)
    };
    
    totals.total = totals.partnerA + totals.partnerBC;
    
    return totals;
  },
  
  // Calculate equity percentages
  calculateEquity() {
    const contributions = this.calculateTotalContributions();
    const total = contributions.total;
    
    if (total === 0) {
      return { partnerA: 50, partnerBC: 50 };
    }
    
    return {
      partnerA: (contributions.partnerA / total * 100).toFixed(2),
      partnerBC: (contributions.partnerBC / total * 100).toFixed(2)
    };
  }
};

// Make jvStore available globally
window.jvStore = jvStore;

console.log('jvStore initialized');