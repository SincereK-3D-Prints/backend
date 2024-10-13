'use strict';

const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');

/**
 *
 * @param display_name
 * @param displayName
 * @param email
 * @param guid
 * @param tier
 * @param isVerified
 * @param expiresIn {string|boolean|null}
 * @returns {*}
 */
const generateToken = ({
  display_name,
  displayName = 'DiscordBot',
  email = 'bot@shibiko.ai',
  guid = '3689551e-d060-47ca-90a6-3b021447b584',
  tier = 'free',
  isVerified = false
} = {}, { expiresIn = '7d' } = {}) => {
  displayName = display_name || displayName;
  if (!expiresIn) {
    return jwt.sign({ displayName, email, guid, tier, isVerified }, config.get('jwtSecret'));
  }

  return jwt.sign({ displayName, email, guid, tier, isVerified }, config.get('jwtSecret'), { expiresIn });
};

const isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log('no authorization header');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authorization.split(' ')[1];
  if (!token) {
    console.log('no token');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const { displayName, email, guid, tier, isVerified } = jwt.verify(token, config.get('jwtSecret'));
    req.user = { displayName, email, guid, tier, isVerified };
    next();
  } catch (error) {
    if (error.name !== 'JsonWebTokenError') {
      console.error(error);
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const paywall = (type) => async (req, res, next) => {
  const {
    user: { guid },
    psql: { pool },
  } = req;

  try {
    const result = await pool.query(`SELECT * FROM users WHERE guid = $1`, [
      guid,
    ]);

    if (!result.rows[0][type]) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = { guid, [_.camelCase(type)]: result.rows[type] };
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const isPremium = paywall('is_premium');

const isSupporter = paywall('is_supporter');

module.exports = {
  generateToken,
  isAuthenticated,
  isPremium,
  isSupporter,
};
