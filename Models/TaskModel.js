const mongoose = require('mongoose');

// Defining the Task Schema
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'Medium',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'overdue'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false,
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);


// Exporting the Task model
module.exports = Task;
