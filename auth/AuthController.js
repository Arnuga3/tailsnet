const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const UserService = require('./../services/UserService');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: true
}));

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	async (username, password, done) => {
		try {
			const user = await UserService.login({ email: username }, password );
			if (!user) {
				return done(null, false, { message: 'Incorrect email or password' });
			}
			return done(null, user);
		} catch (err) {
			console.error(err);
			done(err);
		}
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

router.post('/local/register', async (req, res) => {
	try {
		const user = await UserService.createUser(req.body);
		const token = jwt.sign({ id: user._id },
			process.env.JWT_SECRET, {
				expiresIn: 86400
			});
		res.setHeader('tntoken', token);
		res.status(200).send(user);

	} catch(err) {
		res.status(500)
			.send(`There was a problem registering a user. Error: ${error}`);
	}
});

router.post('/local', (req, res, next) => {
	passport.authenticate('local', (err, user) => {
		const { token, ...userData } = user;

		if (err)
			return res.status(500).send();
		if (!token)
			return res.status(401).send();

		res.setHeader('tntoken', token);
		res.status(200).send(userData);
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