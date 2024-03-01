const express = require('express');
const router = express.Router();
const {
  signupUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddeware');

router.post("/register", signupUser);
  
router.post("/login", loginUser);

router.get("/", protect, getMe);

module.exports = router;