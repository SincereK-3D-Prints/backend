const { body, validationResult } = require('express-validator');

const VALID_SHIPPING_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'failed',
  'returned'
];

const ValidateOrder = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('products')
    .notEmpty().withMessage('Products are required')
    .isJSON().withMessage('Products must be a valid JSON array')
    .custom((value) => {
      const products = JSON.parse(value);
      if (!Array.isArray(products) || products.length === 0) {
        throw new Error('Products must be a non-empty array');
      }
      products.forEach(product => {
        if (!product.id || !product.name || !product.price || !product.quantity) {
          throw new Error('Each product must have id, name, price, and quantity');
        }
      });
      return true;
    }),

  body('shipping_status')
    .optional()
    .isIn(VALID_SHIPPING_STATUSES)
    .withMessage(`Shipping status must be one of: ${VALID_SHIPPING_STATUSES.join(', ')}`),

  body('tracking_number')
    .optional()
    .isString().withMessage('Tracking number must be a string'),

  body('carrier')
    .optional()
    .isString().withMessage('Carrier must be a string'),

  body('subtotal')
    .notEmpty().withMessage('Subtotal is required')
    .isFloat({ min: 0 }).withMessage('Subtotal must be a non-negative number'),

  body('shipping_cost')
    .notEmpty().withMessage('Shipping cost is required')
    .isFloat({ min: 0 }).withMessage('Shipping cost must be a non-negative number'),

  body('tax')
    .notEmpty().withMessage('Tax is required')
    .isFloat({ min: 0 }).withMessage('Tax must be a non-negative number'),

  body('total')
    .notEmpty().withMessage('Total is required')
    .isFloat({ min: 0 }).withMessage('Total must be a non-negative number'),

  body('shipping_info')
    .notEmpty().withMessage('Shipping information is required')
    .isJSON().withMessage('Shipping information must be valid JSON')
    .custom((value) => {
      const info = JSON.parse(value);
      const required = ['address1', 'city', 'state', 'postal_code', 'country'];
      required.forEach(field => {
        if (!info[field]) {
          throw new Error(`Shipping information must include ${field}`);
        }
      });
      return true;
    }),

  body('billing_info')
    .notEmpty().withMessage('Billing information is required')
    .isJSON().withMessage('Billing information must be valid JSON')
    .custom((value) => {
      const info = JSON.parse(value);
      const required = ['address1', 'city', 'state', 'postal_code', 'country'];
      required.forEach(field => {
        if (!info[field]) {
          throw new Error(`Billing information must include ${field}`);
        }
      });
      return true;
    }),

  body('processor')
    .optional()
    .isIn(['stripe']).withMessage('Only Stripe processor is currently supported'),

  body('processor_order_id')
    .optional()
    .isString().withMessage('Processor order ID must be a string'),

  body('processor_status')
    .optional()
    .isString().withMessage('Processor status must be a string'),

  body('notes')
    .optional()
    .isString().withMessage('Notes must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const ValidateShippingUpdate = [
  body('shipping_status')
    .notEmpty().withMessage('Shipping status is required')
    .isIn(VALID_SHIPPING_STATUSES)
    .withMessage(`Shipping status must be one of: ${VALID_SHIPPING_STATUSES.join(', ')}`),

  body('tracking_number')
    .optional()
    .isString().withMessage('Tracking number must be a string'),

  body('carrier')
    .optional()
    .isString().withMessage('Carrier must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  ValidateOrder,
  ValidateShippingUpdate
};
