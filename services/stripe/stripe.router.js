// stripe.router.js
const express = require('express');
const router = express.Router();
const config = require('config');
const stripe = require('stripe')(config.get('stripe.secret'));

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { total } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating payment intent',
      error: error.message
    });
  }
});

module.exports = router;
