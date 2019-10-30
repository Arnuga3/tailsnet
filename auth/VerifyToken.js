// const jwt = require('jsonwebtoken')

// function verifyToken (req, res, next) {
//   let token = req.headers['x-access-token'] || req.headers['authorization']
//   if (!token) return res.status(403).send({auth: false, message: 'No token provided.'})
//   if (token.startsWith('Bearer ')) token = token.slice(7, token.length)

//   jwt.verify(token, process.env.SECRET, (error, decoded) => {
//     if (error) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'})
//     req.userId = decoded.id
//     next()
//   })
// }

// module.exports = verifyToken;