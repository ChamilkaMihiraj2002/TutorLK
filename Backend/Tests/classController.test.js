// tests/class.controller.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // your Express app
const Class = require('../Models/Class.model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Class.deleteMany({});
});

describe('Class Controller', () => {
  
  it('should create a new class', async () => {
    const res = await request(app)
      .post('/classes')  // change to your route
      .send({
        user: 'user123',
        subject: 'Math',
        classCode: 'MATH101',
        location: 'Room 1',
        classTime: '10:00 AM',
        groupLink: 'https://group.link'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.subject).toBe('Math');
  });

  it('should update a class by id', async () => {
    const cls = await Class.create({ user: 'user123', subject: 'Math', classCode: 'MATH101', location: 'Room 1', classTime: '10:00 AM', groupLink: 'link1' });

    const res = await request(app)
      .put(`/classes/${cls._id}`)
      .send({ subject: 'Advanced Math' });

    expect(res.statusCode).toBe(200);
    expect(res.body.subject).toBe('Advanced Math');
  });

  it('should delete a class by id', async () => {
    const cls = await Class.create({ user: 'user123', subject: 'Math', classCode: 'MATH101', location: 'Room 1', classTime: '10:00 AM', groupLink: 'link1' });

    const res = await request(app).delete(`/classes/${cls._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Class deleted successfully');

    const deleted = await Class.findById(cls._id);
    expect(deleted).toBeNull();
  });
});
