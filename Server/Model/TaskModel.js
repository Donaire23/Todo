const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

    userID: {
      type: String,
      required: true
    },

    task_name: {
      type: String,
      required: true
    },
  
    task_description: {
      type: String,
      required: true
    },
  
    task_date: {
      type: String,
      required: true
    }
    

  })
  
  
  const Task = mongoose.model("Task", TaskSchema);
  
  module.exports = Task