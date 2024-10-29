const express = require('express');
const router = express.Router();
const Order = require('./orders.model');
const { ValidateOrder, ValidateShippingUpdate } = require('./order.middleware');

// List all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
});

// Get orders by email
router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.findByEmail(email);
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json({ order });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error: error.message });
  }
});

// Create a new order
router.post('/', ValidateOrder, async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Update an existing order
router.put('/:id', ValidateOrder, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.update(id, req.body);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json({ order });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
});

// Update shipping status and tracking
router.patch('/:id/shipping', ValidateShippingUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const { shipping_status, tracking_number, carrier } = req.body;

    const order = await Order.updateShipping(id, {
      shipping_status,
      tracking_number,
      carrier
    });

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json({ order });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating shipping information', error: error.message });
  }
});

// Update processor status
router.patch('/:id/processor-status', async (req, res) => {
  try {
    const { id } = req.params;
    const { processor_status } = req.body;

    if (!processor_status) {
      return res.status(400).json({ message: 'Processor status is required' });
    }

    const order = await Order.updateProcessorStatus(id, processor_status);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json({ order });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating processor status', error: error.message });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Order.destroy(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
});

module.exports = router;
