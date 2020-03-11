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
		const { petId } = req.params;
		PetService.getPetPostsById(petId)
		.then(posts => {
			res.status(200).send(posts);
		})
		.catch(error => res.status(400)
			.send(`There was a problem retrieving pet posts. ${error}`));
  	}
);

router.post('/', auth,
	[
		check('text', 'Post decription cannot be empty')
			.notEmpty()
			.trim()
	],
	
	(req, res) => {
		PetService.createPost(req.body, req.userId)
			.then(post => res.status(200).send(post[0]))
			.catch(error => res.status(500).send(`There was a problem creating a post. ${error}`));
	}
);


module.exports = router;