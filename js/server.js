const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = 3000;

// MySQL database connection
const db = mysql.createConnection({
  host: '	103.27.73.70', // Your database host (use your cPanel server's IP or hostname if not localhost)
  user: 'leedongr_inventory_user', // Your database username
  password: 'KeqZzMAsRIXh', // Your database password
  database: 'leedongr_inventory_db' // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Middleware to parse JSON requests
app.use(express.json());

// Get all inventory items
app.get('/inventory', (req, res) => {
  const query = 'SELECT * FROM inventory';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching inventory data:', err);
      return res.status(500).json({ error: 'Could not fetch inventory data.' });
    }
    res.json(results);
  });
});

// Add a new inventory item
app.post('/inventory', (req, res) => {
  const newItem = req.body;
  const query = 'INSERT INTO inventory SET ?';
  db.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding inventory item:', err);
      return res.status(500).json({ error: 'Could not add inventory item.' });
    }
    res.status(201).json({ id: result.insertId, ...newItem });
  });
});

// Delete an inventory item by ID
app.delete('/inventory/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM inventory WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting inventory item:', err);
      return res.status(500).json({ error: 'Could not delete inventory item.' });
    }
    res.status(200).json({ message: 'Item deleted successfully.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});