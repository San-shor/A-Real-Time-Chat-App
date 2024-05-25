const { body } = require('express-validator');

const createValidator = [
  body('user.username', 'username does not Empty').not().isEmpty(),
  body('user.email', 'Invalid email').isEmail(),

  body('user.password', 'password does not Empty').not().isEmpty(),
];

module.exports = createValidator;
