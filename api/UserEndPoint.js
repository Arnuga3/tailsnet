const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AuthToken = require('./../auth/AuthToken');
const auth = AuthToken.vaidateToken;

const UserService = require('../app_layers/services/UserService');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/profile', auth, (req, res) => {
    UserService.getUser(req.userId)
      .then(user => {
        const aUser = user[0];
        res.header('tntoken', req.get('tntoken'));
        res.status(200).send(aUser);
      })
      .catch(error => res.status(400)
        .send(`There was a problem retrieving user profile. ${error}`));
});

router.get('/pets', auth, (req, res) => {
  UserService.getUserPets(req.userId)
    .then(pets => {
      console.log(pets)
      res.header('tntoken', req.get('tntoken'));
      res.status(200).send(pets);
    })
    .catch(error => res.status(400)
      .send(`There was a problem retrieving pet profile(s). ${error}`));
});

module.exports = router;