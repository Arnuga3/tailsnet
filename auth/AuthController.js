const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const AuthToken = require('./AuthToken');

const User = require('./../database/models/User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false, {
        message: 'Incorrect email'
      });

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword)
        return done(null, false, {
          message: 'Incorrect password'
        });
      
      const token = AuthToken.createToken(user.id);
      return done(null, token);
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
  const { title, name, surname, DOB, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = User.create({
    title,
    name,
    surname,
    dob: DOB,
    email,
    password: hashedPassword
  })
  .catch(error => res.status(500)
    .send(`There was a problem registering a user. Error: ${error}`));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });

  return res.status(200)
    .send({ auth: true, token });
});

router.post('/local', (req, res, next) => {
  passport.authenticate('local', (err, token) => {
    if(err)
      return res.status(500).send();

    if(!token)
      return res.status(401).send();

    res.setHeader('tntoken', token);
    return res.status(200).send();
  })(req, res, next);
});

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

router.get('/logout', (req, res) => 
  res.status(200)
  .send({ auth: false, token: null }));

module.exports = router;