import request from 'supertest';
import app from '../index.js';
import authMiddleware from '../middleware/authMiddleware';

describe('authMiddleware', () => {
  it('should authenticate the user and add the user to the request object', async () => {
    // Make a request to an authenticated route
    const res = await request(app)
      .get('/authenticated-route')
      .set('Authorization', 'Bearer valid-token');

    // Assert the response status
    expect(res.status).toBe(200);

    // Assert the presence of the user in the request object
    expect(res.req.user).toBeDefined();
  });

  it('should return 401 when authentication fails', async () => {
    // Make a request to an authenticated route without valid authentication credentials
    const res = await request(app)
      .get('/authenticated-route');

    // Assert the response status
    expect(res.status).toBe(401);

    // Assert the absence of the user in the request object
    expect(res.req.user).toBeUndefined();
  });
});
