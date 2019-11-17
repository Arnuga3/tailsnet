const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AuthToken = require('./../auth/AuthToken');
const auth = AuthToken.vaidateToken;

const User = require('./../database/models/User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.userId, 'name surname').exec()
    .catch(error => res
      .status(400)
      .send(`There was a problem finding users. Error: ${error}`)
    );
  return res.status(200).send(user);
});

module.exports = router;