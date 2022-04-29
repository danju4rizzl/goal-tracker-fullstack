const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

// @desc Get goals
// @route GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

// @desc Set goal
// @route POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  // Handle errors
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text ');
  }

  // Using mongoose to create a new Goal
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  // Using mongoose to find element by ID
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Updating the Goal by its' id
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  // Get the goal by it's ID
  const goal = await Goal.findById(req.params.id);
  // Check if the Goal exists
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
