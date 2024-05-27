const { User } = require('../models/register.model');
const { MessageDB } = require('../models/message.model');

const getChatList = async (req, res) => {
  try {
    const chatList = await User.find({ _id: { $ne: req.user._id } });

    res.status(200).send({ success: true, friends: chatList });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const sendMessage = async (req, res) => {
  const { senderName, receiverId, message } = req.body;
  const senderId = req.user._id;

  try {
    console.log('Incoming data:', {
      senderId,
      senderName,
      receiverId,
      message,
    });
    const newMessage = new MessageDB({
      senderId,
      senderName,
      receiverId,
      message: {
        text: message,
        image: '',
      },
    });
    await newMessage.save();

    res.status(201).send(newMessage);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const sendImageMessage = async (req, res) => {
  const { senderName, receiverId, message } = req.body;
  const senderId = req.user._id;

  try {
    console.log('Incoming data:', {
      senderId,
      senderName,
      receiverId,
      message,
    });
    const newMessage = new MessageDB({
      senderId,
      senderName,
      receiverId,
      message: {
        text: '',
        image: req.file.path,
      },
    });
    await newMessage.save();
    console.log({ newMessage });

    res.status(201).send(newMessage);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const getMessage = async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params.id;

  try {
    const messages = await MessageDB.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).send({ success: true, messages: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
module.exports = { getChatList, sendMessage, getMessage, sendImageMessage };
