const request = require('supertest');
const express = require('express');
const { login, verifyToken } = require('../controllers/authController');

describe('Authentication Controller Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.post('/login', login);
    app.get('/verify', verifyToken, (req, res) => res.status(200).json({ message: 'Token verified' }));
  });

  describe('login', () => {
    it('should successfully login with correct credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'validUser', password: 'validPassword' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should fail to login with incorrect credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'invalidUser', password: 'invalidPassword' });
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Invalid credentials');
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', async () => {
      const validToken = 'validToken';
      const res = await request(app)
        .get('/verify')
        .set('Authorization', `Bearer ${validToken}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Token verified');
    });

    it('should reject an invalid token', async () => {
      const invalidToken = 'invalidToken';
      const res = await request(app)
        .get('/verify')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
    });
  });
});
