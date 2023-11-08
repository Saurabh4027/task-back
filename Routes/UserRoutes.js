// imports starts here
const UserRouter = require('express').Router();
const UserController = require('../Controllers/UserController');
// imports ends here

// Routes starts here

// Home Route (GET) this is just for testing purpose
UserRouter.get('/', UserController.home);

// Login User Route (POST)
UserRouter.post('/login', UserController.loginUser);

// Register User Route (POST)
UserRouter.post('/register', UserController.registerUser);

// Routes ends here

// Exporting UserRouter
module.exports = UserRouter;

