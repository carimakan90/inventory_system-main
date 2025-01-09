document.addEventListener('DOMContentLoaded', () => {
  const supplierForm = document.getElementById('supplier-form');
  const supplierTable = document.getElementById('supplier-table').getElementsByTagName('tbody')[0];
  const supplierDropdown = document.getElementById('item-supplier');

  supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const supplierName = document.getElementById('supplier-name').value;
    const supplierContact = document.getElementById('supplier-contact').value;

    const newRow = supplierTable.insertRow();
    newRow.insertCell(0).innerText = supplierName;
    newRow.insertCell(1).innerText = supplierContact;
    newRow.insertCell(2).innerHTML = '<button onclick="deleteSupplier(this)">Delete</button>';

    const newOption = document.createElement('option');
    newOption.value = supplierName;
    newOption.innerText = supplierName;
    supplierDropdown.appendChild(newOption);

    supplierForm.reset();
  });

  window.deleteSupplier = (button) => {
    const row = button.parentElement.parentElement;
    const supplierName = row.cells[0].innerText;
    supplierDropdown.querySelector(`option[value="${supplierName}"]`).remove();
    row.remove();
  };
});