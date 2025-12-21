import request from 'supertest';
import app from '../server.js';
import { connectTestDB, closeTestDB, clearTestDB } from './setup.js';
import mongoose from 'mongoose';
import Post from '../models/Post.js';

beforeAll(async () => await connectTestDB());
afterEach(async () => await clearTestDB());
afterAll(async () => await closeTestDB());

describe('Post Routes', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const userData = { name: 'Test User', email: 'test@example.com', password: 'password123', gender: 'male', university: 'Test Uni' };
    const signupRes = await request(app).post('/api/auth/signup').send(userData);
    token = signupRes.body.token;
    userId = signupRes.body.user.id;
  });

  it('should create a post', async () => {
  const postData = {
    title: 'Room for rent',
    description: 'Nice room',
    city: 'Cairo',
    address: '123 Street',
    price: 500,
    furnished: true,
    smokingAllowed: false,
    gender: 'male',              
    amenities: JSON.stringify(['WiFi']), 
    contact_Email: 'test@example.com',
    images: []
  };

  const res = await request(app)
    .post('/api/posts')
    .set('Authorization', `Bearer ${token}`)
    .send(postData);

  expect(res.statusCode).toBe(201);
  expect(res.body.post.title).toBe(postData.title);
});


  it('should update own post', async () => {
    const post = await Post.create({
      title: 'Old title',
      description: 'desc',
      city: 'city',
      address: 'addr',
      price: 100,
      gender: 'male',
      contact_Email: 'test@example.com',
      createdBy: new mongoose.Types.ObjectId(userId)
    });

    const res = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.post.title).toBe('New title');
  });

  it('should delete own post', async () => {
    const post = await Post.create({
      title: 'To delete',
      description: 'desc',
      city: 'city',
      address: 'addr',
      price: 100,
      gender: 'male',
      contact_Email: 'test@example.com',
      createdBy: new mongoose.Types.ObjectId(userId)
    });

    const res = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it('should search posts with mandatory filters', async () => {
    await Post.create({
      title: 'Room A',
      description: 'desc',
      city: 'Cairo',
      address: 'addr',
      price: 400,
      gender: 'male',
      contact_Email: 'test@example.com',
      createdBy: new mongoose.Types.ObjectId(userId)
    });

    const res = await request(app)
      .get('/api/posts/search')
      .query({ city: 'Cairo', budget: 500, gender: 'male' })
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.results.length).toBe(1);
  });
});
