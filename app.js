/* eslint-disable prefer-destructuring */
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

/** Import Routes */
const { limit } = require('./middlewares/rateLimiter');
const nasaRouter = require('./controllers/nasaController');
const { client, DATABASE_NAME } = require('./config/db');


client.connect((err) => {
  // const collection = client.db(DATABASE_NAME).collection('devices');
  // perform actions on the collection object
  client.close();
});

/** Instantiate the server */
const app = express();
const PORT = process.env.PORT || 3000;


// const { verifyAuthentication, Errors, notFound } = require('./middlewares/handler');

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


/** Set up routes */
app.use('/api', nasaRouter);

/** Protected Routes */
// app.use(verifyAuthentication);

/**  If no routes found then send to notFoundHandler */
// app.use(notFound);

/** All errors will be sent here and displayed to the user in json format */
// app.use(Errors);


app.listen(PORT, () => {
  console.log('Safer-App listening on port', PORT);
  // eslint-disable-next-line no-undef
  console.log(`Connected to ${DATABASE_NAME}!`);
});
