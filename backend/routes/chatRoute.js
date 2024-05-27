const router = require('express').Router();
const {
  getChatList,
  sendMessage,
  getMessage,
} = require('../controller/message.controller');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/chatList', authenticateToken, getChatList);
router.post('/sendMessage', authenticateToken, sendMessage);
router.get('/getMessage/:id', authenticateToken, getMessage);
module.exports = router;
