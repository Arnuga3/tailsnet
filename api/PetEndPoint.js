const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AuthToken = require('../auth/AuthToken');
const auth = AuthToken.vaidateToken;

const PetService = require('./../app_layers/services/PetService');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// TODO: Need to retrieve all pet profiles for the pet owner, use transactions
// Get all pet profiles
// router.get('/', auth, async (req, res) => {
//   try {
//     const pets = await PetService.getAllPets();
//     res.status(200).send(pets);
//   } catch(error) {
//     res.status(500).send(`There was a problem retrieving pet profiles. Error: ${error}`);
//   }
// });

// TODO: Need to create pet profile for the pet owner, use transactions
// Create a pet profile
router.post('/create', auth, (req, res) => {
    PetService.createPet(req.body, req.userId)
      .then(pet => res.status(200).send(pet))
      .catch(error => res.status(500).send(`There was a problem creating a pet profile. ${error}`));
});

module.exports = router;