const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AuthToken = require('../auth/AuthToken');
const auth = AuthToken.vaidateToken;

const User = require('../database/models/User');
const Pet = require('../database/models/Pet');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', auth, async (req, res) => {
  const pets = await Pet.find({}).exec()
    .catch(error => res
      .status(400)
      .send(`There was a problem finding pets. Error: ${error}`)
    );
  return res.status(200).send(pets);
});

router.post('/create', auth, async (req, res) => {
  const { petType, petName, dob, profileImage } = req.body;
  const pet = await Pet.create({
    petType,
    petName,
    dob,
    profileImage
  })
  .catch(error => res.status(500)
    .send(`There was a problem registering a pet. Error: ${error}`));

  return res.status(200).send(pet);
});

module.exports = router;