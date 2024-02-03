const request = require('supertest');
const app = require('../index.js'); // Import your Express app
const Constituent = require('../model/Constituent');

describe('constituentsController', () => {
    // Dummy data for testing
    const testConstituent = {
        email: 'test@example.com',
        name: 'Test User',
        address: '123 Test St',
    };

    afterEach(async () => {
        // Clean up test data after each test
        await Constituent.deleteMany({});
    });

    describe('GET /api/constituents', () => {
        it('should get all constituents', async () => {
            // Insert a test constituent into the database
            await Constituent.create(testConstituent);

            // Make a request to the API endpoint
            const res = await request(app).get('/api/constituents');
            console.log(res);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveLength(1);
            // Add more assertions based on your response structure
        });

        it('should return an empty array when no constituents are found', async () => {
            // Make a request to the API endpoint when the database is empty
            const res = await request(app).get('/api/constituents');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveLength(0);
        });
    });

    describe('GET /api/constituents/export', () => {
        it('should generate CSV file based on query parameters', async () => {
            // Insert a test constituent into the database
            await Constituent.create(testConstituent);

            // Make a request to the API endpoint
            const res = await request(app).get('/api/constituents/export');

            expect(res.status).toBe(200);
            expect(res.header['content-type']).toBe('text/csv');
            expect(res.header['content-disposition']).toContain('attachment; filename=constituents.csv');
            // Add more assertions based on your response structure
        });

        it('should gracefully handle requests for non-existent constituents when exporting CSV', async () => {
            // Make a request to the API endpoint when no constituents match query parameters
            const res = await request(app).get('/api/constituents/export');

            expect(res.status).toBe(204); // Assuming no content when no data found
        });
    });
    describe('POST /api/constituents', () => {
        it('should add a new constituent', async () => {
            // Make a request to add a new constituent
            const newConstituent = {
                email: 'new@test.com',
                name: 'New User',
                address: '456 New St',
            };

            const res = await request(app)
                .post('/api/constituents')
                .send(newConstituent);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Constituent added successfully');
            expect(res.body.data.email).toBe(newConstituent.email);

            // Check that the new constituent is actually in the database
            const dbConstituent = await Constituent.findOne({ email: newConstituent.email });
            expect(dbConstituent).not.toBeNull();
        });

        it('should not add a constituent with missing required fields', async () => {
            const incompleteConstituent = {
                name: 'Incomplete User',
            };

            const res = await request(app)
                .post('/api/constituents')
                .send(incompleteConstituent);

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error).toContain('Missing required fields');
        });

        it('should not add a constituent with an invalid email format', async () => {
            const invalidEmailConstituent = {
                email: 'invalidEmail',
                name: 'Invalid Email User',
                address: '789 Invalid St',
            };

            const res = await request(app)
                .post('/api/constituents')
                .send(invalidEmailConstituent);

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error).toContain('Invalid email format');
        });
    });
    //add more tests if needed
});
