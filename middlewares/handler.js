/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const logger = require('../services/logger');
const { respondWith } = require('../services/clientResponse');

/*
* Page Not Found Handler
*/
const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.method} ${req.originalUrl}`));
};

/*
*  Error Handler
*/
const error = (error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    error: error.message,
  });
};

/*
 *  Check for login token on every request
 */
const verifyAuthentication = async (req, res, next) => {
  /** Don't need auth for public files */
  if (req.path.substring(0, 7) === '/public') {
    return next();
  }

  /**
   * Get token from Authorization header.
   * Header format - Authorization: Bearer [token]
   */
  if (req.get('Authorization') === undefined) {
    return respondWith(res, 403);
  }

  const authToken = req.get('Authorization').split(' ')[1];

  /** Verify token is valid */
  try {
    const verifiedToken = await jwt.verify(authToken, process.env.SECRETKEY);
    req.token = verifiedToken;
    return next();
  } catch (error) {
    logger.error(`Verify Token Error: ${error}`);
    return respondWith(res, 401);
  }
};

module.exports = {
  verifyAuthentication,
  error,
  notFound,
};
