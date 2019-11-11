const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AuthToken = require('./../auth/AuthToken');
const auth = AuthToken.vaidateToken;

const User = require('./../database/models/User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.userId, 'name surname').exec()
    .catch(error => res
      .status(400)
      .send(`There was a problem finding users. Error: ${error}`)
    );
  return res.status(200).send(user);
});

// // Get user
// router.get('/:id', VerifyToken, async (req, res) => {
//   const user = await User.findById(req.params.id).exec()
//     .catch(error => res.status(400)
//       .send(`There was a problem finding a user. Error: ${error}`))

//   if (!user) return res.status(404).send('User not found')
//   return res.status(200).send(user)
// })

// // Delete user
// router.delete('/:id', async (req, res) => {
//   const user = await User.findByIdAndRemove(req.params.id).exec()
//     .catch(error => res.status(500)
//       .send(`There was a problem deleting a user. Error: ${error}`))

//   if (!user) return res.status(404).send('User not found')
//   return res.status(200).send(`User: ${user.name} was deleted`)
// })

// // Update user
// // Added VerifyToken middleware to make sure only an authenticated user can put to this route
// router.put('/:id', /* VerifyToken, */ async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
//     .catch(error => res.status(500)
//       .send(`There was a problem updating the user. Error: ${error}`))

//   if (!user) return res.status(404).send('User not found') 
//   return res.status(200).send(user)
// })

module.exports = router;