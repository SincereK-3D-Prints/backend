const express = require('express');
const router = express.Router();
const Product = require('./products.model');
const { ValidateProduct } = require('./products.middleware'); // Import the validation middleware

// List all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ product });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
});

// Get a specific product by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findSlug(slug);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ product });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
});

// Create a new product
router.post('/', ValidateProduct, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// Update an existing product
router.put('/:id', ValidateProduct, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.update(id, req.body);
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
