// Imports Starts here
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoConnection = require('./Configs/mongoConnection');
const TaskRouter = require('./Routes/TaskRoutes');
const UserRouter = require('./Routes/UserRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
// Imports Ends here


// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api", TaskRouter);
app.use("/api/user", UserRouter);
app.get("/",(req,res)=>{
    res.send("Server is working")
})


// Listen to the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        mongoConnection();
    });
}

module.exports = app;
