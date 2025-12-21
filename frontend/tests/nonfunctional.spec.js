// import { test, expect } from '@playwright/test';

// // Base URLs
// const BASE_URL = 'http://localhost:5000';
// const API_URL = `${BASE_URL}/api/posts`;

// let token = '';

// test.describe('Roommate Finder Non-Functional Tests', () => {

//   test.beforeAll(async ({ request }) => {
//     // Login as a test user to get token
//     const response = await request.post(`${BASE_URL}/api/auth/login`, {
//       data: {
//         email: 'ranaa@example.com',
//         password: '123'
//       }
//     });
//     const body = await response.json();
//     token = body.token;
//     expect(token).toBeTruthy();
//   });

//   // ---------------- PERFORMANCE: API Response ----------------
//   test('GET /api/posts response time < 500ms', async ({ request }) => {
//     const start = Date.now();
//     const response = await request.get(API_URL, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const duration = Date.now() - start;
//     expect(response.ok()).toBeTruthy();
//     console.log(`GET /posts took ${duration} ms`);
//     expect(duration).toBeLessThan(500);
//   });

//   // ---------------- RELIABILITY: CRUD Operations ----------------
//   let postId = '';

//   test('Create a new post', async ({ request }) => {
//   const response = await request.post(API_URL, {
//     headers: { Authorization: `Bearer ${token}` },
//     // Use 'data' for JSON unless you are uploading a physical file
//     data: {
//       title: 'Automated Test Post',
//       description: 'This is created by Playwright',
//       city: 'Cairo',
//       address: 'Test Street 1',
//       price: 1000,
//       furnished: true, // Use boolean if your schema expects it
//       smokingAllowed: false,
//       gender: 'male',
//       amenities: { wifi: true, airConditioning: true }, // Send as object
//       contact_Email: 'testuser@example.com'
//     }
//   });

//   // Log the error body if the request fails to see WHY it failed
//   if (!response.ok()) {
//     console.error('Create Post Failed:', await response.text());
//   }

//   expect(response.ok()).toBeTruthy();
//   const data = await response.json();
//   expect(data.post._id).toBeTruthy();
//   postId = data.post._id;
// });
//   test('Update the post', async ({ request }) => {
//     const response = await request.put(`${API_URL}/${postId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       data: { title: 'Updated Automated Test Post' }
//     });
//     const data = await response.json();
//     expect(response.ok()).toBeTruthy();
//     expect(data.post.title).toBe('Updated Automated Test Post');
//   });

//   test('Get post by ID', async ({ request }) => {
//     const response = await request.get(`${API_URL}/${postId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const data = await response.json();
//     expect(response.ok()).toBeTruthy();
//     expect(data._id).toBe(postId);
//   });

//   test('Delete the post', async ({ request }) => {
//     const response = await request.delete(`${API_URL}/${postId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const data = await response.json();
//     expect(response.ok()).toBeTruthy();
//     expect(data.message).toBe('Post deleted successfully');
//   });

//   // ---------------- SECURITY: Unauthorized Access ----------------
//   test('Prevent unauthorized access to /api/posts/me', async ({ request }) => {
//     const response = await request.get(`${API_URL}/me`);
//     expect(response.status()).toBe(401);
//   });

// });
