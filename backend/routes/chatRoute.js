const router = require('express').Router();
const {
  getChatList,
  sendMessage,
  getMessage,
  sendImageMessage,
  messageSeen,
  messageDelivered,
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
router.put('/seen-message/:id', authenticateToken, messageSeen);
router.put('/delivered-message/:id', authenticateToken, messageDelivered);
module.exports = router;
