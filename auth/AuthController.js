const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "https://tailsnet.herokuapp.com/auth/facebook/callback"
},
(accessToken, refreshToken, profile, done) => {
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  done();
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://tailsnet.herokuapp.com/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  onsole.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  done();
}));

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const VerifyToken = require('./VerifyToken');
// const User = require('./../models/User');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body

//   const user = await User.findOne({ email }).exec()
//     .catch(error => res.status(500)
//       .send(`Server error. Error: ${error}`))

//   if (!user) return res.status(404).send('User not found')

//   const passwordIsValid = bcrypt.compareSync(password, user.password)
//   if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })

//   const token = jwt.sign({ id: user._id }, process.env.SECRET, {
//     expiresIn: 86400  // 24h
//   })

//   return res.status(200).send({ auth: true, token: token })
// })

// // Logout
// router.get('/logout', (req, res) => res.status(200).send({ auth: false, token: null }))

// // Register
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body
//   const hashedPassword = bcrypt.hashSync(password, 8)

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword
//   }).catch(error => res.status(500)
//       .send(`There was a problem registering a user. Error: ${error}`))

//   const token = jwt.sign({ id: user._id }, process.env.SECRET, {
//     expiresIn: 86400  // 24h
//   })

//   return res.status(200).send({ auth: true, token: token })
// })

// router.get('/me', VerifyToken, async (req, res) => {
//   const user = await User.findById(req.userId, { password: 0 }).exec()
//     .catch(error => res.status(500)
//       .send(`There was a problem finding a user. Error: ${error}`))

//   if (!user) return res.status(404).send('User not found')
//   return res.status(200).send(user)
// })

module.exports = router;