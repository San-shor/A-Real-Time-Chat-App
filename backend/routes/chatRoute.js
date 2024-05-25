const router = require('express').Router();
const { getChatList } = require('../controller/message.controller');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/chatList', authenticateToken, getChatList);

module.exports = router;
