/* eslint-disable no-console */
/*
 * Safer-App main server
 */
require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const compression = require('compression');
const path = require('path');
const sanitizer = require('sanitize');
const expressSanitizer = require('express-sanitizer');
const { limit } = require('./middlewares/rateLimiter');
const methodOverride = require('method-override');

/** Instantiate the server */
const app = express();
const PORT = process.env.PORT || 3000;

const { verifyAuthentication, error, notFound } = require('./middlewares/handler');

/** Import Routes */


/** Set up static public directory */
app.use(express.static(path.join(__dirname, '..', 'public')));

/** Middlewarez */
app.use(limit);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(sanitizer.middleware);
app.use(expressSanitizer());
app.use(methodOverride('_method'))

/** Set up routes */
const auth = require('./controllers/auth')(app);
const breezeData = require('./controllers/breezeData')(app);

/** Protected Routes */
app.use(verifyAuthentication);

/**  If no routes found then send to notFoundHandler */
app.use(notFound);

/** All errors will be sent here and displayed to the user in json format */
app.use(error);


app.listen(PORT, () => {
  console.log('Safer-App listening on port', PORT);
});

module.exports = app;
