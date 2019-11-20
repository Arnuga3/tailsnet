const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AuthToken = require('../auth/AuthToken');
const auth = AuthToken.vaidateToken;

const User = require('./../database/models/User');
const Pet = require('./../database/models/Pet');
const PetService = require('./../services/PetService');

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
    const petDTO = req.body;
    try {
      const pet = await PetService.createPet(petDTO);
      res.status(200).send(pet);
    } catch(e) {
      res.status(500).send(`There was a problem creating a pet profile. Error: ${error}`);
    }
});

module.exports = router;