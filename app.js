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
const methodOverride = require('method-override');
const mongoose = require('mongoose');

/** Import Routes */
const { limit } = require('./middlewares/rateLimiter');
const nasaRouter = require('./controllers/nasaController');
const breezeData = require('./controllers/breezeData');
const authRouter = require('./controllers/auth');


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://elliot:${process.env.DBPASSWORD}@ds239858.mlab.com:39858/safer-app` || 'mongodb://localhost/Safer-db', { useNewUrlParser: true, useUnifiedTopology: true });
console.log('You are connected to the db');

/** Instantiate the server */
const app = express();
const PORT = process.env.PORT || 3000;


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
app.use(methodOverride('_method'));

/** Set up routes */
app.use('/api', nasaRouter);
app.use('/api', breezeData);
app.use('/api', authRouter);


app.listen(PORT, () => {
  console.log('Safer-App listening on port', PORT);
});
