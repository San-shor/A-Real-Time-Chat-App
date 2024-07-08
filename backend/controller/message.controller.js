const { User } = require('../models/register.model');
const { MessageDB } = require('../models/message.model');

const getChatList = async (req, res) => {
  let fnd_msg = [];
  try {
    const chatList = await User.find({ _id: { $ne: req.user._id } });

    for (let i = 0; i < chatList.length; i++) {
      let lastMsg = await getLastMessage(req.user._id, chatList[i]._id);
      fnd_msg = [
        ...fnd_msg,
        {
          fndInfo: chatList[i],
          msgInfo: lastMsg,
        },
      ];
    }

    res.status(200).send({ success: true, friends: fnd_msg });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const sendMessage = async (req, res) => {
  const { senderName, receiverId, message } = req.body;
  const senderId = req.user._id;

  try {
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
const getLastMessage = async (userId, fdId) => {
  const msg = await MessageDB.findOne({
    $or: [
      {
        $and: [
          {
            senderId: {
              $eq: userId,
            },
          },
          {
            receiverId: {
              $eq: fdId,
            },
          },
        ],
      },
      {
        $and: [
          {
            senderId: {
              $eq: fdId,
            },
          },
          {
            receiverId: {
              $eq: userId,
            },
          },
        ],
      },
    ],
  }).sort({
    updatedAt: -1,
  });
  console.log(msg);
  return msg;
};

const messageSeen = async (req, res) => {
  const messageId = req.body._id;

  try {
    const updateMessageStatus = await MessageDB.findByIdAndUpdate(
      messageId,
      {
        status: 'seen',
      },
      { new: true }
    );
    res.status(200).send(updateMessageStatus);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
const messageDelivered = async (req, res) => {
  const messageId = req.body._id;

  try {
    const updateMessageStatus = await MessageDB.findByIdAndUpdate(
      messageId,
      {
        status: 'delivered',
      },
      { new: true }
    );
    res.status(200).send(updateMessageStatus);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  getChatList,
  sendMessage,
  getMessage,
  sendImageMessage,
  messageSeen,
  messageDelivered,
};
