const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // your Express app entry
const User = require('../Models/User.model');
const Class = require('../Models/Class.model');

jest.setTimeout(30000);

let mongoServer;

// ---------------------- DB SETUP & TEARDOWN ----------------------
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await User.deleteMany();
  await Class.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// ---------------------- TEST CASES ----------------------
describe('Class Controller', () => {
  // ---------- getAllClasses ----------
  it('should return all classes', async () => {
    const user = await User.create({ username: 'teacher', email: 'teacher@example.com', password: 'secret123' });
    
    await Class.create({ 
      user: user._id.toString(),
      subject: 'Mathematics',
      classCode: 'MATH101',
      location: 'Room 101',
      classTime: '9:00 AM' 
    });
    
    await Class.create({ 
      user: user._id.toString(),
      subject: 'Physics',
      classCode: 'PHYS101',
      location: 'Room 102',
      classTime: '10:00 AM' 
    });

    const res = await request(app).get('/classes');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('subject');
  });
});
