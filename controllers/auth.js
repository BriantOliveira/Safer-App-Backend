/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { respondWith } = require('../services/clientResponse');


const router = Router();

router.post('/sign-up', (req, res) => {
  // Create User and JWT
  const user = new User(req.body);
  console.log(user);
  user.save().then((user) => {
    let token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '60 days' });
    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    return respondWith(res, 200, { user });
  }).catch((err) => {
    console.log(err.message);
    return respondWith(res, 400, { err });
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Find this user name
  User.findOne({ username }, 'username password').then((user) => {
    if (!user) {
      // User not found

      return res.status(401).send({ message: 'Wrong Username or Password *' });
    }
    // Check the password
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        // Password does not match
        return res.status(401).send({ message: 'Wrong Username or password ?' });
      }
      // Create a token
      const token = jwt.sign(
        { _id: user._id, username: user.username },
        process.env.SECRET,
      );

        // Set a cookie and redirect to root
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
    });
  }).catch((err) => {
    console.log(err);
  });
});


router.get('/logout', (req, res) => {
  res.clearCookie('nToken');
  res.redirect('/');
});

module.exports = router;
