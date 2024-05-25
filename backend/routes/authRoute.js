const router = require('express').Router();

const { userRegister, userLogin } = require('../controller/user.controller.js');
const fileUpload = require('../middleware/file-upload.js');

router.post('/user-register', fileUpload.single('image'), userRegister);
router.post('/user-login', userLogin);

module.exports = router;
