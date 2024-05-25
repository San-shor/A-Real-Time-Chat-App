// const jwt = require('jsonwebtoken');

// module.exports.authMiddleware = async (req, res, next) => {
//   const authToken = req.cookies ? req.cookies.authToken : null;
//   try {
//     if (authToken) {
//       const deCodeToken = await jwt.verify(authToken, process.env.SECRET_KEY);

//       req.myId = deCodeToken.id;

//       next();
//     } else {
//       res.status(401).send({ errorMessage: 'No token provided' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({ errorMessage: 'Unauthorized' });
//   }
// };
