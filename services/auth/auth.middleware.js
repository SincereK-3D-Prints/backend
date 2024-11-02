const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { body, validationResult } = require('express-validator');
const Auth = require('./auth.model');

const upsertUsers = async (profile, provider) => {
  const email = profile.emails[0].value;
  let user = await Auth.findByEmail(email);

  if (user) {
    // User exists - update with new social ID if not present
    if (!user[`${provider}_id`]) {
      await Auth.update({
        id: user.id,
        [`${provider}_id`]: profile.id
      });
    }
  } else {
    // New user
    user = await Auth.create({
      email,
      [`${provider}_id`]: profile.id,
      password: null
    });
  }

  return user;
};

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await Auth.findByEmail(email);

    if (!user) {
      user = await Auth.create({
        email,
        facebook_id: profile.id,
        password: null
      });
    } else if (!user.facebook_id) {
      await Auth.update({
        id: user.id,
        facebook_id: profile.id
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let user = await Auth.findByEmail(email);

    if (!user) {
      user = await Auth.create({
        email,
        google_id: profile.id,
        password: null
      });
    } else if (!user.google_id) {
      await Auth.update({
        id: user.id,
        google_id: profile.id
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// JWT Strategy for protecting routes
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await Auth.findById(payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await Auth.findByEmail(email);
    if (!user) return done(null, false, { message: 'Invalid credentials' });

    const isValid = await Auth.verifyPassword(password, user.password);
    if (!isValid) return done(null, false, { message: 'Invalid credentials' });

    await Auth.updateLastLogin(user.id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Validation for your register route
const ValidateRegistration = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  authenticateJWT: passport.authenticate('jwt', { session: false }),
  ValidateRegistration
};
