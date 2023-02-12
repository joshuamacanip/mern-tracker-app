const mongoose = require("mongoose");

//Task item schema
const TaskItem = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, "Must provide one!"],
      maxLength: [50, "Characters must not exceed 50 characters!"],
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Export Task item model
module.exports = mongoose.model("TaskItem", TaskItem);
