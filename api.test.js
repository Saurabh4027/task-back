const Task = require("./Models/TaskModel");
const User = require("./Models/UserModel");
const request = require('supertest');
const app = require('./server');
const mongoose = require('mongoose');
require('dotenv').config();

describe('User and Task API Routes', () => {

    let userToken;
    let taskId;

    beforeAll(async () => {
        process.env.TESTING = true;
        await mongoose.connect(process.env.TEST_MONGO_URI)
    })
    afterAll(async () => {
        process.env.TESTING = false;
        await mongoose.connection.close()
        process.env.NODE_ENV = 'development';
    })
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                email: 'testuser2@example.com',
                password: 'testpassword2',
                name: 'Test User2',
            });
        expect(response.status).toBe(201);
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/user/login')
            .send({ email: 'testuser2@example.com', password: 'testpassword2' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        userToken = response.body.token;
    });

    it('should return the home route message for both user and task', async () => {
        const userResponse = await request(app).get('/api/user');
        expect(userResponse.status).toBe(200);
        expect(userResponse.text).toContain('This is the Home Route of the User');
        const taskResponse = await request(app).get('/api');
        expect(taskResponse.status).toBe(200);
        expect(taskResponse.text).toContain('This is the Home Route of the Task');
    });

    it('should create a task', async () => {
        const taskResponse = await request(app)
            .post('/api/task')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                title: 'Test Task',
                description: 'Test Description',
                priority: 'high',
            });
        expect(taskResponse.status).toBe(201);
        expect(taskResponse.body.message).toBe('Task Created Successfully');
        expect(taskResponse.body.isSuccess).toBe(true);
        const createdTask = await Task.findOne({ title: 'Test Task' });
        expect(createdTask).not.toBeNull();
        taskId = createdTask._id;
    });

    it('should get all the task of logged in user', async () => {
        const taskResponse = await request(app)
            .get('/api/task')
            .set('Authorization', `Bearer ${userToken}`);
        expect(taskResponse.status).toBe(200);
        expect(taskResponse.body.tasks.length).toBe(1);
    })
    it('should get the task by it\'s id', async () => {
        const taskResponse = await request(app)
            .get(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(taskResponse.status).toBe(200);
        expect(taskResponse.body.task.title).toBe('Test Task');
    });
    it('should update the task by it\'s id', async () => {
        const taskResponse = await request(app)
            .put(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                title: 'Updated Task',
                description: 'Updated Description',
                priority: 'low',
                completed: true,
                status: 'completed',
            });
        expect(taskResponse.status).toBe(200);
        expect(taskResponse.body.message).toBe('Task Updated Successfully');
        expect(taskResponse.body.isSuccess).toBe(true);
        const updatedTask = await Task.findById(taskId);
        expect(updatedTask.title).toBe('Updated Task');
    })
    it('should delete the task by it\'s id', async () => {
        const taskResponse = await request(app)
            .delete(`/api/task/${taskId}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(taskResponse.status).toBe(200);
        expect(taskResponse.body.message).toBe('Task Deleted Successfully');
        expect(taskResponse.body.isSuccess).toBe(true);
        const deletedTask = await Task.findById(taskId);
        expect(deletedTask).toBeNull();
    })
});