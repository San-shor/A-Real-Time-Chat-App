const { User } = require('../models/register.model');

const getChatList = async (req, res) => {
  console.log(res.body);
  try {
    const chatList = await User.find({});
    res.status(200).send({ success: true, friends: chatList });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = { getChatList };
