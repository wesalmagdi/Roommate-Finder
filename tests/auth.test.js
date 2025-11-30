import request from 'supertest';
import app from '../server.js';
import { connectTestDB, closeTestDB, clearTestDB } from './setup.js';
import User from '../models/User.js';

beforeAll(async () => await connectTestDB());
afterEach(async () => await clearTestDB());
afterAll(async () => await closeTestDB());

describe('Auth Routes', () => {
  const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };

  it('should signup a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(userData.email);
  });

  it('should not signup a duplicate user', async () => {
    await request(app).post('/api/auth/signup').send(userData);
    const res = await request(app).post('/api/auth/signup').send(userData);
    expect(res.statusCode).toBe(400);
  });

  it('should login an existing user', async () => {
    await request(app).post('/api/auth/signup').send(userData);
    const res = await request(app).post('/api/auth/login').send({ email: userData.email, password: userData.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    await request(app).post('/api/auth/signup').send(userData);
    const res = await request(app).post('/api/auth/login').send({ email: userData.email, password: 'wrongpass' });
    expect(res.statusCode).toBe(400);
  });

  it('should access protected route with valid token', async () => {
    const signupRes = await request(app).post('/api/auth/signup').send(userData);
    const token = signupRes.body.token;
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(userData.email);
  });

  it('should fail protected route without token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toBe(401);
  });
});
