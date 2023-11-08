// imports starts here
const TaskRouter = require('express').Router();
const TaskController = require('../Controllers/TaskController');
const authenticateMiddleware = require('../Middlewares/autheticateMiddlware');
// imports ends here


// Routes starts here

// Home Route (GET) this is just for testing purpose
TaskRouter.get('/', TaskController.home);

// Create Task Route (POST)
TaskRouter.post('/task', authenticateMiddleware, TaskController.createTask);

// Get All Task Route (GET)
TaskRouter.get('/task', authenticateMiddleware, TaskController.getAllTask);

// Get Task by It's ID Route (GET)
TaskRouter.get('/task/:id', authenticateMiddleware, TaskController.getTask);

// Update Task Route (PUT)
TaskRouter.put('/task/:id', authenticateMiddleware, TaskController.updateTask);

// Delete Task Route (DELETE)
TaskRouter.delete('/task/:id', authenticateMiddleware, TaskController.deleteTask);

// Routes ends here

// Exporting TaskRouter 
module.exports = TaskRouter;





