const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, param, validationResult } = require('express-validator');
const AuthToken = require('../auth/AuthToken');
const auth = AuthToken.vaidateToken;

const PetService = require('./../app_layers/services/PetService');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:petId', auth, 
	[
		param('petId', 'Pet id is missing')
			.exists()
			.isNumeric()
	],
	(req, res) => {
		PetService.getPet(req.params.petId)
		.then(pet => {
			const aPet = pet[0];
			res.status(200).send(aPet);
		})
		.catch(error => res.status(400)
			.send(`There was a problem retrieving pet data. ${error}`));
  	}
);

router.post('/create', auth,
	[
		check('petName', 'Pet name cannot be empty')
			.notEmpty()
			.trim(),

		check('petType', 'Pet type cannot be empty')
			.notEmpty()
			.trim(),

		check('dob', 'Date of birth cannot be empty')
			.notEmpty()
			.trim()
	],
	
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(422).json({ errors: errors.array() });
		
		PetService.createPet(req.body, req.userId)
			.then(pet => res.status(200).send(pet[0]))
			.catch(error => res.status(500).send(`There was a problem creating a pet profile. ${error}`));
	}
);

router.post('/upload-profile-image', auth, 
	[
		check('petId', 'Pet id cannot be empty')
			.isNumeric()
			.notEmpty()
			.trim(),
			
		check('files')
			.notEmpty()
	],

	(req, res) => {
		if (!req.files || Object.keys(req.files).length === 0)
			return res.status(400).send('File is not uploaded');
		
		

		PetService.uploadPetProfileImage(req.userId, req.body.petId, req.files)
			.then(() => res.status(200).send())
			.catch(error => res.status(400)
				.send(`There was a problem uploading profile image. ${error}`));;
});

module.exports = router;