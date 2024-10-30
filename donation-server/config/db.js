const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

module.exports = client;
