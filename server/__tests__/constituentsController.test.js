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

    const newConstituent = {
        email: 'new@test.com',
        name: 'New User',
        address: '456 New St',
    };

    afterEach(async () => {
        // Clean up test data after each test by deleting the specific test constituent
        await Constituent.deleteMany({ email: 'test@example.com' });
        await Constituent.deleteMany({ email: 'new@test.com' });

    });

    describe('GET /api/constituents', () => {
        it('should get all constituents and verify database increases by one', async () => {
            // Query the database for the count of constituents before insertion
            const initialCount = await Constituent.countDocuments();
        
            // Insert a test constituent into the database
            await Constituent.create(testConstituent);
        
            // Make a request to the API endpoint to get all constituents
            const res = await request(app).get('/api/constituents');
        
            // Query the database for the count of constituents after insertion
            const finalCount = await Constituent.countDocuments();
        
            // Assertions
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            
            // Check if the API response includes the newly added constituent
            // This assumes your API returns all constituents, including the newly added one
            expect(res.body.data).toEqual(expect.arrayContaining([expect.objectContaining(testConstituent)]));
        
            // Verify the database count increased by exactly one
            expect(finalCount - initialCount).toBe(1);
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
    });
    describe('POST /api/constituents', () => {
        it('should add a new constituent', async () => {
            // Make a request to add a new constituent
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
    });
    //add more tests if needed
});
