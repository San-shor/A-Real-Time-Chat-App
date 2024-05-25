const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const chatRoute = require('./routes/chatRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const corsConfig = {
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['Authorization'],
};
app.use(cookieParser());

app.use(cors(corsConfig));
app.use(express.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/api/messenger', authRoute);
app.use('/api/messenger', chatRoute);

(async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/messenger');
    console.log('connected successfully');
    app.listen(PORT, () => {
      console.log(`Server ( JWT) is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
