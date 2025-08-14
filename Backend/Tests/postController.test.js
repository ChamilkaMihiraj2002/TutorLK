const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // your Express app
const Post = require('../Models/Post.model');

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
  await Post.deleteMany();
});

describe('POST /posts', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ user: 'John Doe', text: 'Hello World', image: 'test.jpg' });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe('John Doe');
    expect(res.body.text).toBe('Hello World');
  });

  it('should fail when user or text is missing', async () => {
    const res = await request(app).post('/posts').send({ text: 'Only text' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User and text are required');
  });
});

describe('GET /posts/:id', () => {
  it('should get a post by ID', async () => {
    const post = await Post.create({ user: 'Alex', text: 'Some text' });
    const res = await request(app).get(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBe('Alex');
  });

  it('should return 404 if post not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/posts/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /posts/:id', () => {
  it('should update a post', async () => {
    const post = await Post.create({ user: 'Sam', text: 'Old text' });
    const res = await request(app)
      .put(`/posts/${post._id}`)
      .send({ text: 'Updated text' });

    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe('Updated text');
  });
});

describe('DELETE /posts/:id', () => {
  it('should delete a post', async () => {
    const post = await Post.create({ user: 'Liam', text: 'Delete me' });
    const res = await request(app).delete(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Post deleted successfully');
  });
});
