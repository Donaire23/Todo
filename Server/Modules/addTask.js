const express = require('express');
const router = express.Router();
const Task = require("../Model/TaskModel");
const moment = require('moment-timezone');

router.post('/', async(req, res ) => {

    const {task_name, task_description, task_date} = req.body;
    const userId = req.query.userID;

    try {   
        const formattedDate = moment(task_date).tz('Asia/Manila').format('YYYY-MM-DD');
        const Tasks = new Task({
            userID: userId, 
            task_name: task_name,
            task_description: task_description,
            task_date: formattedDate
        });

        Tasks.save();
        res.status(200).json({ message: "add success"})
    } catch(error) {
   
        res.status(500)
    }
})

const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD');

router.get('/userTask', async(req, res) => {
    const userID = req.query.userID;
    try {
        const tasks = await Task.aggregate([
            {
                $match: {
                    task_date: currentDate,
                    userID: userID
                }
            }
        ]);
        res.send(tasks);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/upcommingTask', async(req, res) => {
    const userID = req.query.userID;
    try {
        const tasks = await Task.aggregate([
            {
                $match: {
                    userID: userID,
                    task_date: { $gt: currentDate } 
                }
            }
        ]);
        res.send(tasks)
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/delayTask', async(req, res) => {
    const userID = req.query.userID;
    try {
        const tasks = await Task.aggregate([
            {
                $match: {
                    userID: userID,
                    task_date: { $lt: currentDate } 
                }
            }
        ]);
        res.send(tasks)
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/stickWall', async(req, res) => {
    const userID = req.query.userID;
    try {
       
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete', async(req, res) => {
    const taskID = req.query.taskID;
    try {
        await Task.findByIdAndDelete(taskID);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
})


router.put('/edit', async (req, res) => {
    
    const taskID = req.query.taskID;
    const taskName = req.body.task_name;
    const taskDescription = req.body.description;
    const task_date = req.body.date;

    try {
        const formattedDate = moment(task_date).tz('Asia/Manila').format('YYYY-MM-DD');

        if (taskName || taskDescription || task_date) {

            const updateFields = {};
            if (taskName) updateFields.task_name = taskName;
            if (taskDescription) updateFields.task_description = taskDescription;
            if (task_date) updateFields.task_date = formattedDate;
            await Task.findByIdAndUpdate(taskID, updateFields);

        } else {

            return res.status(400).json({ message: "Task name or description is required" });

        }

        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;