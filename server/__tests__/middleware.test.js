const request = require('supertest');
const { authenticate, errorHandler, validateRequest } = require('../middleware');
const express = require('express');

describe('Middleware Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    app.post('/test/authenticate', authenticate, (req, res) => {
      res.status(200).json({ message: 'Authenticated' });
    });

    app.post('/test/validate', validateRequest, (req, res) => {
      res.status(200).json({ message: 'Validated' });
    });

    app.use(errorHandler);
  });

  describe('authenticate Middleware', () => {
    it('should allow access with valid token', async () => {
      const res = await request(app)
        .post('/test/authenticate')
        .set('Authorization', 'Bearer valid_token');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Authenticated');
    });

    it('should deny access without token', async () => {
      const res = await request(app)
        .post('/test/authenticate');
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
    });
  });

  describe('validateRequest Middleware', () => {
    it('should pass validation with all required fields', async () => {
      const res = await request(app)
        .post('/test/validate')
        .send({ requiredField: 'value' });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Validated');
    });

    it('should fail validation when required fields are missing', async () => {
      const res = await request(app)
        .post('/test/validate')
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Missing required fields');
    });
  });

  describe('errorHandler Middleware', () => {
    it('should handle errors correctly', async () => {
      app.get('/test/error', (req, res, next) => {
        const err = new Error('Test Error');
        err.status = 500;
        next(err);
      });

      const res = await request(app).get('/test/error');
      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Test Error');
    });
  });
});
