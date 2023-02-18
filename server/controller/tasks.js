const TaskItem = require("../model/taskItem");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomErrorAPI } = require("../error/customError");

// GET Controller
const getTasks = asyncWrapper(async (req, res) => {
  // Find all tasks
  const tasks = await TaskItem.find({}).sort({ updatedAt: "descending" });

  // Respond with all Tasks
  res.status(200).json(tasks);
});

// POST Controller
const createTask = asyncWrapper(async (req, res) => {
  // Create new Task
  const task = await TaskItem.create(req.body);

  if (!task) {
    next(createCustomErrorAPI(404, "Failed to create task!"));
  }

  // Respond with newly created task
  res.status(200).json(task);
});

// UPDATE Controller
const updateTask = asyncWrapper(async (req, res, next) => {
  //Get id of task
  const { id } = req.params;

  // Find task and update
  const task = await TaskItem.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  //Check if update task is success
  if (!task) {
    return next(createCustomErrorAPI(404, "Task ID does not exist!"));
  }

  // Respond with newly updated task
  res.status(200).json(task);
});

// DELETE Controller
const deleteTask = asyncWrapper(async (req, res, next) => {
  // Get id of task
  const { id } = req.params;

  // Find task and delete
  const task = await TaskItem.findByIdAndDelete(id);

  //Check if delete task is success
  if (!task) {
    return next(createCustomErrorAPI(404, "Task ID does not exist!"));
  }

  // Respond with deleted task
  res.status(200).json(task);
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
