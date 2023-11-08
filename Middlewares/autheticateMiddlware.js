const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateMiddleware(req, res, next) {

    // Getting the token from the request header
    let token = req.header('Authorization');

    try {
        // Checking if no token
        if (!token) {
            return res.status(401).send({ error: 'Authentication failed', message: 'No token provided' });
        }

        // here i'm removing the Bearer from the token
        token = token.replace('Bearer ', '');

        // Verifying the token and getting the payload with jwt.verify() method
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Assigning the payload to req.user for later use
        req.user = decoded;

        // Calling next() to pass the request to the next middleware function or route handler
        next();
    } catch (error) {
        res.status(401).send({ error: 'Authentication failed' });
    }
}

module.exports = authenticateMiddleware;
