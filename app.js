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
var bodyParser = require('body-parser')
const cons = require('consolidate');
const session = require('express-session');

/** Test Landing Page With Handlebars */
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/** Import Non-Auth Routes */


/** Instantiate the server */
const app = express();
const PORT = process.env.PORT || 3000;

const { verifyAuthentication, error, notFound } = require('./middlewares/handler');

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

//Add sessions and body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session());

/** Passport Authentication */
const passport = require('passport');
const auth = require('./config/isAuthenticated')
const passportMethods = require('./config/passport.js')

//Initialize Authenticate
app.use(passport.initialize());
app.use(passport.session());

//User Magic for Passport Authentication
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//Use Passport Strategies (LOCAL, FB, TWITTER, GOOGLE)

// LOCAL LOGIN
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    console.log('username, password', username, password);
    if (username !== 'admin') {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (password !== 'passwd') {
      return done(null, false, { message: 'Incorrect password.' });
    }
    console.log('LocalStrategy OK');
    return done(null, {
      username: 'admin'
    });
  }
));

// FACEBOOK LOGIN
passport.use('facebook', new FacebookStrategy({
    clientID: 'some-fb-client-id',
    clientSecret: 'some-secret',
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('>>>fbProfile::', profile);
    // in real life: create or update user...
    return done(null, {username: profile.id});
  }
));

// TWITTER LOGIN
// TODO: Add  Twitter Login

// GOOGLE LOGIN
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // callbackURL: "https://shrouded-ridge-38664.herokuapp.com/auth/google/callback"
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
      console.log("User", profile)
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
           if (user) {
               console.log("user found")
           }
         return done(err, user);
       });
  }
));

/** Login Routes */
const loginRoutes= require('./controllers/auth.js')

const methodOverride = require('method-override');
//override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

//THIS LINE SEEMS IMPORTANT
loginRoutes(app, passport);

/** Protected Routes */
app.use(verifyAuthentication);

/**  If no routes found then send to notFoundHandler */
app.use(notFound);

/** All errors will be sent here and displayed to the user in json format */
app.use(error);

/** Set up the SAFER DATABASE in MongoDB Cloud, maybe put in different file? **/
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zni:<MONGODBPASSWORD>@safer-cluster-ekvvi.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

//TO DO: Check if User Model works
client.connect(err => {
  const collection = client.db("Users").collection("General Profile Info");
  client.close();
});

app.listen(PORT, () => {
  console.log('Safer-App listening on port', PORT);
});
