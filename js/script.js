let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let editIndex = -1;

// Load existing data
function displayInventory() {
  const tableBody = document.querySelector('#inventory-table tbody');
  tableBody.innerHTML = '';
  inventory.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${item.supplier}</td>
        <td>${item.status}</td>
        <td><img src="${item.image}" alt="Item Image" style="height: 50px;"></td>
        <td>
          <button onclick="editItem(${index})">Edit</button>
          <button onclick="deleteItem(${index})">Delete</button>
        </td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

document.getElementById('inventory-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('item-name').value;
  const quantity = parseInt(document.getElementById('item-quantity').value);
  const price = parseFloat(document.getElementById('item-price').value);
  const supplier = document.getElementById('item-supplier').value;
  const status = document.getElementById('item-status').value;
  const imageFile = document.getElementById('item-image').files[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    const image = e.target.result;

    if (editIndex === -1) {
      inventory.push({ name, quantity, price, supplier, status, image });
    } else {
      inventory[editIndex] = { name, quantity, price, supplier, status, image };
      editIndex = -1;
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
    displayInventory();
    document.getElementById('inventory-form').reset();
  };

  reader.readAsDataURL(imageFile);
});

function editItem(index) {
  const item = inventory[index];
  document.getElementById('item-name').value = item.name;
  document.getElementById('item-quantity').value = item.quantity;
  document.getElementById('item-price').value = item.price;
  document.getElementById('item-supplier').value = item.supplier;
  document.getElementById('item-status').value = item.status;
  editIndex = index;
}

function deleteItem(index) {
  inventory.splice(index, 1);
  localStorage.setItem('inventory', JSON.stringify(inventory));
  displayInventory();
}

// Export JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(inventory, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'inventory.json';
  a.click();

  URL.revokeObjectURL(url);
}

// Import JSON
function importFromJsonFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      if (Array.isArray(importedData)) {
        inventory = importedData;
        localStorage.setItem('inventory', JSON.stringify(inventory));
        displayInventory();
      } else {
        alert('Invalid JSON format!');
      }
    } catch (error) {
      alert('Error reading file: ' + error.message);
    }
  };

  reader.readAsText(file);
}

document.getElementById('import-file').addEventListener('change', importFromJsonFile);

document.addEventListener('DOMContentLoaded', () => {
  displayInventory();
});