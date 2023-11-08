const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/UserModel');
const UserController = {

    home: (req, res) => res.send('This is the Home Route of the User'),

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {

            // Checking if user  already exists in database
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Here I'm Checking if password is correct use bcrypt.compare() method
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token for user 
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '7h' });
            res.status(200).json({ user, token });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    registerUser: async (req, res) => {
        const { email, password, name } = req.body;


        try {
            // Here i'm Checking if user already exists in database
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create new user
            const newUser = new User({ email, password: hashedPassword, name });

            // Saving new user to database
            await newUser.save();

            // Generate JWT token for new user so that user can login immediately after registration
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7h' });

            res.status(201).json({ user: newUser, token });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
};

module.exports = UserController;
