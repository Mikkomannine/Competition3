const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
}
};
// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  const { text, dueDate, priority } = req.body;

  if (!text || !dueDate || !priority) {
      return res.status(400).json({ message: 'Please include all required fields: text, dueDate, and priority' });
  }

  try {
      const goal = await Goal.create({
          text,
          dueDate,
          priority,
          user: req.user.id,
      });

      res.status(201).json(goal);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  const { text, dueDate, priority } = req.body;

  // Build a goal object
  const goalFields = {};
  if (text) goalFields.text = text;
  if (dueDate) goalFields.dueDate = dueDate;
  if (priority) goalFields.priority = priority;

  try {
      let goal = await Goal.findById(req.params.id);

      if (!goal) {
          return res.status(404).json({ message: 'Goal not found' });
      }

      // Check for user
      if (goal.user.toString() !== req.user.id) {
          return res.status(401).json({ message: 'User not authorized' });
      }

      goal = await Goal.findByIdAndUpdate(req.params.id, { $set: goalFields }, { new: true });

      res.json(goal);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
    }

    // Check for user
    if (goal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await goal.remove();

    res.json({ message: 'Goal removed' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
}
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};