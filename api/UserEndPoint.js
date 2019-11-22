const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AuthToken = require('./../auth/AuthToken');
const auth = AuthToken.vaidateToken;

const UserService = require('../app_layers/services/UserService');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Get pet owner profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await UserService.getUser(req.userId);
    res.status(200).send(user);
  } catch(error) {
    res.status(400).send(`There was a problem retrieving user profile. Error: ${error}`)
  }
});

module.exports = router;