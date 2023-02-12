const TaskItem = require("../model/taskItem");

// GET Controller
const getTasks = async (req, res) => {
  // Find all tasks
  const tasks = await TaskItem.find({}).sort({ updatedAt: "descending" });

  // Respond with all Tasks
  res.status(200).json(tasks);
};

// POST Controller
const createTask = async (req, res) => {
  // Create new Task
  const task = await TaskItem.create(req.body);

  // Respond with newly created task
  res.status(200).json(task);
};

// UPDATE Controller
const updateTask = async (req, res) => {
  //Get id of task
  const { id } = req.params;

  // Find task and update
  const task = await TaskItem.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // Respond with newly updated task
  res.status(200).json(task);
};

// DELETE Controller
const deleteTask = async (req, res) => {
  // Get id of task
  const { id } = req.params;

  // Find task and delete
  const task = await TaskItem.findByIdAndDelete(id);

  // Respond with deleted task
  res.status(200).json(task);
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
