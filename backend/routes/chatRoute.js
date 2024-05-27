const router = require('express').Router();
const {
  getChatList,
  sendMessage,
  getMessage,
  sendImageMessage,
} = require('../controller/message.controller');
const authenticateToken = require('../middleware/authMiddleware');
const fileUpload = require('../middleware/file-upload.js');

router.get('/chatList', authenticateToken, getChatList);
router.post('/sendMessage', authenticateToken, sendMessage);
router.post(
  '/sendImageMessage',
  fileUpload.single('image'),
  authenticateToken,
  sendImageMessage
);
router.get('/getMessage/:id', authenticateToken, getMessage);
module.exports = router;
