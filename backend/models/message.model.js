const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      text: {
        type: String,
        default: '',
      },
      image: {
        type: String,
        default: '',
      },
    },
    status: {
      type: String,
      default: 'unseen',
    },
  },
  { timestamps: true }
);
const MessageDB = mongoose.model('Message', messageSchema);
module.exports = { MessageDB };
