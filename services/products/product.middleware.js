const { body, validationResult } = require('express-validator');

const ValidateProduct = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isJSON().withMessage('Price must be a valid JSON'),

  body('description')
    .optional().isString().withMessage('Description must be a string'),

  body('image')
    .optional().isJSON().withMessage('Images must be a valid JSON array'),

  body('colors')
    .optional().isJSON().withMessage('Colors must be a valid JSON array'),

  body('sizes')
    .optional().isJSON().withMessage('Sizes must be a valid JSON array'),

  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('sold')
    .notEmpty().withMessage('Sold is required')
    .isInt({ min: 0 }).withMessage('Sold must be a non-negative integer'),

  body('shipping_cost')
    .optional().isFloat({ min: 0 }).withMessage('Shipping cost must be a non-negative number'),

  body('production_cost')
    .optional().isFloat({ min: 0 }).withMessage('Production cost must be a non-negative number'),

  body('production_time')
    .optional().isString().withMessage('Production time must be a valid interval'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  ValidateProduct
};
