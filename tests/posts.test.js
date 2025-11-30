import request from 'supertest';
import app from '../server.js';
import { connectTestDB, closeTestDB, clearTestDB } from './setup.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

beforeAll(async () => await connectTestDB());
afterEach(async () => await clearTestDB());
afterAll(async () => await closeTestDB());

describe('Post Routes', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };
    const signupRes = await request(app).post('/api/auth/signup').send(userData);
    token = signupRes.body.token;
    userId = signupRes.body.user.id;
  });

  it('should create a post', async () => {
    const postData = {
      title: 'Room for rent',
      description: 'Nice room available',
      location: 'Downtown',
      city: 'Cairo',
      address: '123 Street',
      price: 500,
      furnished: true,
      smokingAllowed: false,
      gender: 'any',
      amenities: { wifi: true },
      images: []
    };

    const res = await request(app).post('/api/posts').set('Authorization', `Bearer ${token}`).send(postData);
    expect(res.statusCode).toBe(201);
    expect(res.body.post.title).toBe(postData.title);
  });

  it('should get all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a post', async () => {
    const post = await Post.create({
      title: 'Old title',
      description: 'desc',
      location: 'loc',
      city: 'city',
      address: 'addr',
      price: 100,
      gender: 'any',
      createdBy: userId
    });

    const res = await request(app).put(`/api/posts/${post._id}`).set('Authorization', `Bearer ${token}`).send({ title: 'New title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.post.title).toBe('New title');
  });

  it('should delete a post', async () => {
    const post = await Post.create({
      title: 'To delete',
      description: 'desc',
      location: 'loc',
      city: 'city',
      address: 'addr',
      price: 100,
      gender: 'any',
      createdBy: userId
    });

    const res = await request(app).delete(`/api/posts/${post._id}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('should search posts', async () => {
    await Post.create({
      title: 'Room A',
      description: 'desc',
      location: 'Downtown',
      city: 'Cairo',
      address: 'addr',
      price: 400,
      gender: 'any',
      createdBy: userId
    });

    const res = await request(app).get('/api/posts/search').query({ location: 'Downtown', budget: 500, gender: 'any' }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
