const mongoose = require('mongoose');

// Define Donation Schema
const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, default: 'pending' }, // Track payment status
//   transactionId: { type: String }, // To store the transaction ID
}, {timestamps : true});

// Create the Donation model and explicitly set the collection name to 'donate'
const Donation = mongoose.model('Donation', donationSchema, 'donate'); // The third parameter specifies the collection name

module.exports = Donation;
