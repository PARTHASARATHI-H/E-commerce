const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'shoemart',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return; // Important: Exit if connection fails
  }
  console.log('Connected to the database');

  // Create the products table if it doesn't exist
  db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      description TEXT,
      image_url VARCHAR(255)
    )
  `, (createTableErr) => {
    if (createTableErr) {
      console.error('Error creating products table:', createTableErr);
      return; // Exit if table creation fails
    }
    console.log('Products table created (or already exists)');

    // Check for existing products and seed if necessary
    db.query('SELECT COUNT(*) AS count FROM products', (countErr, countResult) => {
      if (countErr) {
        console.error("Error checking product count:", countErr);
        return;
      }
      const productCount = countResult[0].count;
      if (productCount === 0) {
        // Populate the table with sample data
        const sampleProducts = [
          { name: 'Air Force', price: 130, description: 'Classic Air Force shoes', image_url: 'img/air.png' },
          { name: 'Air Jordan', price: 149, description: 'High-top Air Jordan shoes', image_url: 'img/jordan.png' },
          { name: 'Blazer', price: 109, description: 'Retro Blazer shoes', image_url: 'img/blazer.png' },
          { name: 'Crater', price: 129, description: 'Sustainable Crater shoes', image_url: 'img/crater.png' },
          { name: 'Hippie', price: 99, description: 'Eco-friendly Hippie shoes', image_url: 'img/hippie.png' },
        ];

        let insertCount = 0; // Keep track of inserted products
        sampleProducts.forEach(product => {
          db.query('INSERT INTO products (name, price, description, image_url) VALUES (?, ?, ?, ?)',
            [product.name, product.price, product.description, product.image_url],
            (insertErr) => {
              if (insertErr) {
                console.error('Error inserting product:', product.name, insertErr);
              } else {
                console.log('Inserted product:', product.name);
                insertCount++;
                if (insertCount === sampleProducts.length) {
                  // Only start the server after all products are inserted
                  startServer();
                }
              }
            });
        });
      } else {
        console.log("Products already exist in database.");
        startServer(); // Start the server if products exist
      }
    });
  });
});

// API endpoints

// Get all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    } else {
      res.json(results);
    }
  });
});

// Get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, result) => {
    if (err) {
      console.error('Error fetching product:', err);
      res.status(500).json({ error: 'Failed to fetch product' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result[0]);
    }
  });
});

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

