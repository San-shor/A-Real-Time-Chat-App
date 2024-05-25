const { User } = require('../models/register.model');

const getChatList = async (req, res) => {
  try {
    const chatList = await User.find({ _id: { $ne: req.user._id } });
    console.log(chatList);
    res.status(200).send({ success: true, friends: chatList });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = { getChatList };
