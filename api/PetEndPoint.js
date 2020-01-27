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

// Create a pet profile
router.post('/create', auth, (req, res) => {
    PetService.createPet(req.body, req.userId)
      .then(pet => res.status(200).send(pet))
      .catch(error => res.status(500).send(`There was a problem creating a pet profile. ${error}`));
});

// TODO - pass pet id as well
router.post('/upload-profile-image', auth, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).send('File is not uploaded');

    PetService.uploadPetProfileImage(req.userId, req.files)
    .then(() => res.status(200).send())
    .catch(error => res.status(400)
      .send(`There was a problem uploading profile image. ${error}`));;
});

module.exports = router;