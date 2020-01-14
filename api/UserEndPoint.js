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

router.post('/upload-profile-image', auth, (req, res) => {
  console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('File is not uploaded')

  let avatarImage = req.files.avatarImage;

  avatarImage.mv('temp/test.png', err => {
    if (err) return res.status(500).send(err);
    res.status(200).send();
  });

  // TODO - Link to the user, save path to an image, etc.
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