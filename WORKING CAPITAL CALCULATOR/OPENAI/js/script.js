function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    document.querySelector(`#${tabId}`).classList.add('active');
    event.target.classList.add('active');
}

function toggleDelayInput(checkbox) {
    document.getElementById('delayInputLabel').style.display = checkbox.checked ? 'block' : 'none';
}

function toggleGSTInput(checkbox) {
    document.getElementById('gstRateLabel').style.display = checkbox.checked ? 'block' : 'none';
} 

function simulateCashFlow() {
    alert("Simulate button clicked. Logic to be added in Phase 3.");
}

function exportToExcel() {
    alert("Export button clicked. Logic to be added later.");
}
// Load external HTML form component dynamically
window.addEventListener('DOMContentLoaded', () => {
  fetch('components/cashflow-form.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('cashFlowForm').innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading cash flow form:", error);
    });
});
