const mongoose = require('mongoose');
const Constituent = require('./model/Constituent'); // Ensure the path is correct
require('dotenv').config();

const mongodbURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/constituent_database';

// More realistic sample data with well-known email service domains
const seedData = [
    {
        email: 'john.doe@gmail.com',
        name: 'John Doe',
        address: '123 Maple Drive, Springfield, IL 62704',
        signUpTime: new Date('2022-01-01T08:00:00Z')
    },
    {
        email: 'jane.smith@outlook.com',
        name: 'Jane Smith',
        address: '456 Oak Lane, Centerville, CA 93657',
        signUpTime: new Date('2022-01-02T10:30:00Z')
    },
    {
        email: 'bob.johnson@yahoo.com',
        name: 'Bob Johnson',
        address: '789 Pine Street, Lakeside, TX 75001',
        signUpTime: new Date('2022-01-03T12:15:00Z')
    },
    {
        email: 'susan.anderson@hotmail.com',
        name: 'Susan Anderson',
        address: '101 Elm Court, River City, GA 30301',
        signUpTime: new Date('2022-01-04T14:45:00Z')
    },
    {
        email: 'mike.wilson@yahoo.com',
        name: 'Mike Wilson',
        address: '222 Birch Road, Hill Valley, CA 95420',
        signUpTime: new Date('2022-01-05T16:30:00Z')
    },
    {
        email: 'alice.johnson@gmail.com',
        name: 'Alice Johnson',
        address: '334 Cedar Ave, Pleasantville, NY 10570',
        signUpTime: new Date('2022-02-01T09:00:00Z')
    },
    {
        email: 'david.smith@outlook.com',
        name: 'David Smith',
        address: '555 Maple Street, Anytown, AZ 85001',
        signUpTime: new Date('2022-02-02T10:00:00Z')
    },
    {
        email: 'carol.white@hotmail.com',
        name: 'Carol White',
        address: '666 Oak Drive, Smalltown, FL 32123',
        signUpTime: new Date('2022-02-03T11:30:00Z')
    },
    {
        email: 'steve.brown@yahoo.com',
        name: 'Steve Brown',
        address: '777 Pine Lane, Oldtown, ME 04401',
        signUpTime: new Date('2022-02-04T13:45:00Z')
    },
    {
        email: 'rachel.green@gmail.com',
        name: 'Rachel Green',
        address: '888 Elm Street, Newtown, CO 80112',
        signUpTime: new Date('2022-02-05T15:30:00Z')
    },
    {
        email: 'luke.morales@outlook.com',
        name: 'Luke Morales',
        address: '999 Cedar Road, Fairview, NJ 07010',
        signUpTime: new Date('2022-02-06T16:00:00Z')
    },
    {
        email: 'emma.hall@hotmail.com',
        name: 'Emma Hall',
        address: '1110 Birch Street, Lakeview, MN 55401',
        signUpTime: new Date('2022-02-07T17:30:00Z')
    },
    {
        email: 'noah.lee@yahoo.com',
        name: 'Noah Lee',
        address: '1211 Maple Ave, Brookside, MO 64101',
        signUpTime: new Date('2022-02-08T18:00:00Z')
    },
    {
        email: 'olivia.harris@gmail.com',
        name: 'Olivia Harris',
        address: '1312 Oak Street, Sunnyside, WA 98944',
        signUpTime: new Date('2022-02-09T19:30:00Z')
    },
    {
        email: 'liam.clark@outlook.com',
        name: 'Liam Clark',
        address: '1413 Pine Drive, Eastside, VT 05403',
        signUpTime: new Date('2022-02-10T20:00:00Z')
    }
];

// Seed the database
async function seedDatabase() {
    try {
        await mongoose.connect(mongodbURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to the database.");

        await Constituent.deleteMany({});
        console.log("Database cleared.");

        // Insert seed data
        await Constituent.insertMany(seedData);
        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
        console.log("Database connection closed.");
    }
}

// Run the seed function
seedDatabase();
