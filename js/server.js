const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Path to the JSON file
const dataFilePath = path.join(__dirname, 'inventory.json');

// Middleware to parse JSON requests
app.use(express.json());

// Get all inventory items
app.get('/inventory', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read inventory data.' });
    }
    res.json(JSON.parse(data || '[]'));
  });
});

// Add a new inventory item
app.post('/inventory', (req, res) => {
  const newItem = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read inventory data.' });
    }

    const inventory = JSON.parse(data || '[]');
    inventory.push(newItem);

    fs.writeFile(dataFilePath, JSON.stringify(inventory, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not save inventory data.' });
      }
      res.status(201).json(newItem);
    });
  });
});

// Delete an inventory item by index
app.delete('/inventory/:index', (req, res) => {
  const index = parseInt(req.params.index);

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read inventory data.' });
    }

    const inventory = JSON.parse(data || '[]');
    if (index < 0 || index >= inventory.length) {
      return res.status(400).json({ error: 'Invalid index.' });
    }

    inventory.splice(index, 1);

    fs.writeFile(dataFilePath, JSON.stringify(inventory, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not save inventory data.' });
      }
      res.status(204).send();
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
