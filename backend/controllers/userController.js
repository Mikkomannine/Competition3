const jwt = require('jsonwebtoken');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

  // signup a user
  const  signupUser = async (req, res) => {
    const { email, password, username, date_of_birth, phone_number } = req.body;

    console.log(`Email: ${email}, Password: ${password}, Username: ${username}, Date of Birth: ${date_of_birth}, Phone Number: ${phone_number}`); // Log the received email and password
    try {
      //const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.signup(username, email, password, date_of_birth, phone_number); // Pass the hashed password
      // create a token
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.stack });
    }
  };

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  // console.log(`Username: ${username}, Password: ${password}`); // Log the received username and password

  const user = await User.findOne({ username });

  if (!user) {
    console.log('No user found with the provided username'); // Log if no user is found
    return res.status(401).json({ message: "Authentication failed on user" });
  }

  // console.log(`Stored hashed password: ${user.password}`); // Log the stored hashed password

  const passwordMatch = await bcrypt.compare(password, user.password);

  // console.log(`Password match: ${passwordMatch}`); // Log the result of the password comparison

  if (!passwordMatch) {
    console.log('Provided password does not match the stored password'); // Log if passwords do not match
    return res.status(401).json({ message: "Authentication failed on password" });
  }

  const token = createToken(user._id);

  res.status(200).json({ message: "Authentication successful", _id: user._id, username, email: user.email, token });
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
      const user = await User.findById(req.user._id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  
  signupUser,
  loginUser,
  getMe,
};