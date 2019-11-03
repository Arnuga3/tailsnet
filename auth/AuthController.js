const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('./../database/models/User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err)
        return done(err);

      if (!user)
        return done(null, false, { message: 'Incorrect email' });

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword)
        return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    });
  }
));

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
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  done();
}));

router.post('/local/register', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = User.create({
    email,
    password: hashedPassword
  })
  .catch(error => res.status(500)
  .send(`There was a problem registering a user. Error: ${error}`));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });

  return res.status(200)
    .send({ auth: true, token });
});

router.post('/local',
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    session: false
  })
);

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
    session: false
  })
);

router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
    session: false
  })
);

// const VerifyToken = require('./VerifyToken');

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