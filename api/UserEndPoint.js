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

router.put('/profile', auth, (req, res) => {
  UserService.updateUser({ id: req.userId, ...req.body })
    .then(user => {
      const aUser = user[0];
      res.header('tntoken', req.get('tntoken'));
      res.status(200).send(aUser);
    })
    .catch(error => res.status(400)
      .send(`There was a problem retrieving user profile. ${error}`));
});

/* TODO - Implement upload to aws s3:
  1. Limit the max size can be uploaded
  2. Implement additional security, monitoring, logging (nr of files/mb can be uploaded, frequency, etc.)
  3. On request, create temp. access signature/token, allow uploading from client
  4. Check the min size of file can be uploaded
*/

router.post('/upload-profile-image', auth, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('File is not uploaded');

  UserService.uploadUserProfileImage(req.userId, req.files)
    .then(() => res.status(200).send())
    .catch(error => res.status(400)
      .send(`There was a problem uploading profile image. ${error}`));;
});

router.get('/pets', auth, (req, res) => {
  UserService.getUserPets(req.userId)
    .then(pets => {
      res.header('tntoken', req.get('tntoken'));
      res.status(200).send(pets);
    })
    .catch(error => res.status(400)
      .send(`There was a problem retrieving pet profile(s). ${error}`));
});

module.exports = router;