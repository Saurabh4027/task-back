// This is the Task Controller that will  help to make the functionality of all the route related to the task 

// imports starts here
const Task = require("../Models/TaskModel");
// imports ends here]

const taskController = {
    home: (req, res) => res.send('This is the Home Route of the Task'),
    createTask: async (req, res) => {

        // Getting the user id from the req.user object for making sure that creator of the task is the user who is logged in
        const { id } = req.user;
        const { title, description, priority, } = req.body;
        try {

            // Making of new task with Task model
            const newTask = new Task({
                title,
                description,
                priority,
                user: id
            });
            // saving the newly created task in database
            await newTask.save();
            res.status(201).json({ message: 'Task Created Successfully', isSuccess: true });

        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    getAllTask: async (req, res) => {
        const { id } = req.user;
        try {
            // getting all the tasks from the database of the user who is logged in by using the user id
            const tasks = await Task.find({ user: id });
            res.status(200).json({ tasks, isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    updateTask: async (req, res) => {
        const { id } = req.params;
        const { title, description, priority, completed, status } = req.body;
        try {
            // checking if the task exists in the database
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task Not Found', isSuccess: false });
            }
            // updating the task in the database
            await Task.findByIdAndUpdate(id, { title, description, priority, completed, status });
            res.status(200).json({ message: 'Task Updated Successfully', isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    deleteTask: async (req, res) => {
        const { id } = req.params;
        try {
            // checking if the task exists in the database
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task Not Found', isSuccess: false });
            }
            // deleting the task from the database
            await Task.findByIdAndDelete(id);
            res.status(200).json({ message: 'Task Deleted Successfully', isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    getTask: async (req, res) => {
        const { id } = req.params;
        try {
            // checking if the task exists in the database
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task Not Found', isSuccess: false });
            }
            // sending the task to the client
            res.status(200).json({ task, isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    }
}

module.exports = taskController;