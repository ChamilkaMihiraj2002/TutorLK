const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Your Express app (no DB connection here)
const User = require('../Models/User.model');
const Post = require('../Models/Post.model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
  await Post.deleteMany();
});

describe('GET /users', () => {
  it('should return all users', async () => {
    await User.create({ username: 'Alice', email: 'alice@test.com', password: 'pass123' });
    await User.create({ username: 'Bob', email: 'bob@test.com', password: 'pass456' });

    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});

describe('GET /users/:name', () => {
  it('should return a user by username', async () => {
    await User.create({ username: 'Charlie', email: 'charlie@test.com', password: 'pass789' });

    const res = await request(app).get('/users/Charlie');

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('Charlie');
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app).get('/users/NonExistent');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a user and their posts', async () => {
    const user = await User.create({ username: 'Dave', email: 'dave@test.com', password: 'pass' });
    await Post.create({ user: user._id, text: 'Post1' });
    await Post.create({ user: user._id, text: 'Post2' });

    const res = await request(app).delete(`/users/${user._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted successfully, 2 post(s) removed');

    const postsLeft = await Post.find({ user: user._id });
    expect(postsLeft.length).toBe(0);
  });

  it('should return 404 if user not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/users/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});

describe('PUT /users/:id', () => {
  it('should update a user', async () => {
    const user = await User.create({ username: 'Eve', email: 'eve@test.com', password: 'pass' });

    const res = await request(app)
      .put(`/users/${user._id}`)
      .send({ email: 'neweve@test.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('neweve@test.com');
  });

  it('should return 404 if user not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).put(`/users/${fakeId}`).send({ email: 'doesnotexist@test.com' });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
