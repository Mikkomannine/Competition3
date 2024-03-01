const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddeware');
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');




router.route('/').post(protect, setGoal).get(protect, getGoals);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;