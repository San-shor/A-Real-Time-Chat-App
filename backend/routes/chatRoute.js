const router = require('express').Router();
const { getChatList } = require('../controller/message.controller');
const authMiddleware = require('../middleware/authMiddleware').authMiddleware;

router.get('/chatList', getChatList);

module.exports = router;
