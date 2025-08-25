const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // your Express app entry
const User = require('../Models/User.model');
const Post = require('../Models/Post.model');
const Class = require('../Models/Class.model');

jest.setTimeout(30000); // prevent timeout errors

let mongoServer;

// ---------------------- DB SETUP & TEARDOWN ----------------------
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await Class.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// ---------------------- TEST CASES ----------------------
describe('User Controller', () => {
  // ---------- getAllUsers ----------
  it('should return all users', async () => {
    await User.create({ username: 'john', email: 'john@example.com', password: 'secret123' });
    await User.create({ username: 'jane', email: 'jane@example.com', password: 'secret123' });

    const res = await request(app).get('/users'); // adjust route if different

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('username');
  });

  // ---------- getUserById ----------
  it('should return a user by username', async () => {
    await User.create({ username: 'john', email: 'john@example.com', password: 'secret123' });

    const res = await request(app).get('/users/john'); // adjust route if different

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('john');
  });

  it('should return 404 if user not found by username', async () => {
    const res = await request(app).get('/users/notfound');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  // ---------- updateUser ----------
  it('should update a user', async () => {
    const user = await User.create({ username: 'john', email: 'john@example.com', password: 'secret123' });

    const res = await request(app)
      .put(`/users/${user._id}`)
      .send({ email: 'updated@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('updated@example.com');
  });

  it('should return 404 when updating non-existing user', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).put(`/users/${fakeId}`).send({ email: 'nope@example.com' });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  // ---------- deleteUser ----------
  it('should delete a user and related posts and classes', async () => {
    const user = await User.create({ username: 'john', email: 'john@example.com', password: 'secret123' });
    await Post.create({ user: user._id, title: 'Test Post' , text:"test"});
    await Class.create({
      user: user._id,
      subject: 'Math',
      classCode: 'C101',
      location: 'Room 1',
      classTime: '10:00',
    });

    const res = await request(app).delete(`/users/${user._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('User deleted successfully');

    const posts = await Post.find({ user: user._id });
    const classes = await Class.find({ user: user._id });
    expect(posts.length).toBe(0);
    expect(classes.length).toBe(0);
  });

  it('should return 404 if deleting non-existing user', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/users/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
