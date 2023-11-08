const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.TEST_MONGO_URI = mongoUri;
    process.env.NODE_ENV = 'test';
});

afterAll(async () => {
    if (mongoServer) {
        await mongoServer.stop();
    }
});
