const { User } = require('../models/register.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'Whatever';

const userRegister = async (req, res) => {
  const { userName, email, password } = req.body;
  console.log('user');

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email is already registered' });
    }

    const newUser = new User({
      userName,
      email,
      password: await bcrypt.hash(password, 10),
      image: req.file.path,
    });
    console.log(newUser);
    const savedUser = await newUser.save();

    const accessToken = jwt.sign({ _id: savedUser._id }, SECRET_KEY);

    const userInfo = {
      savedUser,
      successMessage: 'Your registration was successful',
      accessToken,
    };
    console.log(userInfo);
    res.status(201).json(userInfo);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return res.status(409).send({ message: 'This user is not found' });

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) throw new Error();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET_KEY
    );
    const userInfo = {
      id: user._id,
      email: user.email,
      username: user.userName,
      image: user.image,
      token: token,
    };
    res.status(200).send({ userInfo, successMessage: 'Your Login Successful' });
  } catch (error) {
    console.log(error);
    res.status(401).send({ errorMessage: 'Email or password is incorrect' });
  }
};

module.exports = { userRegister, userLogin };
