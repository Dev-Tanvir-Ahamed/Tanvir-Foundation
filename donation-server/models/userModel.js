const client = require('../config/db');
const db = client.db('assignment');
const User = db.collection('users');

module.exports = User;
