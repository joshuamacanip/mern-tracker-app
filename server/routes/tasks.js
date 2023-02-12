const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");

// Route for GET and POST
router.route("/").get(getTasks).post(createTask);

// Route for PATCH and DELETE
router.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
