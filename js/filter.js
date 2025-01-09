document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('header-placeholder').innerHTML = data;
      });

  const filterForm = document.getElementById('filter-form');
  const inventoryTable = document.getElementById('inventory-table');
  const tableBody = inventoryTable.querySelector('tbody');

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const supplierContact = document.getElementById('supplier-contact').value;

    // Fetch the inventory data (this should be replaced with actual data fetching logic)
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    // Filter the inventory based on the supplier contact
    const filteredInventory = inventory.filter(item => item.supplierContact === supplierContact);

    // Display the filtered inventory
    tableBody.innerHTML = '';
    filteredInventory.forEach(item => {
      const row = `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price.toFixed(2)}</td>
          <td>${item.supplier}</td>
          <td>${item.status}</td>
        </tr>`;
      tableBody.innerHTML += row;
    });

    inventoryTable.style.display = filteredInventory.length > 0 ? 'table' : 'none';
  });
});