// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');

// TODO: get this serialization working and take it out of app.js
// module.exports = function(passport) {

    // // used to serialize the user for the session
    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    // });
    //
    // // used to deserialize the user
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         done(err, user);
    //     });
    // });

// Exports
module.exports.LocalStrategy = localStrategy;
module.exports.FacebookStrategy = facebookStrategy;
module.exports.TwitterStrategy = twitterStrategy;
module.exports.GoogleStrategy = googleStrategy;
