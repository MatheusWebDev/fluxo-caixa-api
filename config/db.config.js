const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to the in-memory database.
 */
async function connect() {
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    const mongooseOpts = {
        useUnifiedTopology: true,
        useNewUrlParser: true
    };

    await mongoose.connect(uri, mongooseOpts)
        .then(() => {
            console.log("MONGO CONNECTION OPEN!!!");
        })
        .catch(err => {
            console.log("OH NO... MONGO CONNECTION ERROR!!!!", err);
            process.exit();
        });
}

/**
 * Drop database, close the connection and stop mongod.
 */
async function closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
async function clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};

module.exports = { connect, closeDatabase, clearDatabase };