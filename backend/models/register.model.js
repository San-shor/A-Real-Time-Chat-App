const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = { User };
