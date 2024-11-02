const express = require('express');
const router = express.Router();
const passport = require('passport');
const Auth = require('./auth.model');
const { ValidateRegistration } = require('./auth.middleware');

router.get('/role', passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    return res.json({ role: req.user.role });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user role' });
  }
});

router.post('/signup', ValidateRegistration, async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const existingUser = await Auth.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already signed up' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await Auth.create({ email, password });
    const token = Auth.generateToken(user);

    res.json({ token, user: { id: user.id, email: user.email }});
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Auth.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send password reset email
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending password reset email' });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);

    const token = Auth.generateToken(user);
    return res.json({ token, user: { id: user.id, email: user.email }});
  })(req, res, next);
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = Auth.generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  }
);

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const token = Auth.generateToken(req.user);
    const redirect = req.query.redirect || '/';
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  }
);

router.post('/facebook/deauthorize', async (req, res) => {
  try {
    // Handle user deauthorizing your app
    // You might want to mark the user as inactive or remove Facebook ID
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: 'Error processing deauthorization' });
  }
});

module.exports = router;
