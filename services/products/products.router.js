const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// List all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', details: error.message });
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
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', details: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, price, description, image, colors, stock, shipping_cost, production_cost, production_time } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      description,
      image,
      colors,
      stock,
      shipping_cost,
      production_cost,
      production_time
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', details: error.message });
  }
});

// Update an existing product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image, colors, stock, shipping_cost, production_cost, production_time } = req.body;
    const updatedProduct = await Product.update(id, {
      name,
      price,
      description,
      image,
      colors,
      stock,
      shipping_cost,
      production_cost,
      production_time
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', details: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', details: error.message });
  }
});

module.exports = router;
