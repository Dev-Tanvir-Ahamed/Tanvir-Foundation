// models/DonationPost.js
const mongoose = require('mongoose');

const donationPostSchema = new mongoose.Schema({
  image: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
});

const DonationPost = mongoose.model('DonationPost', donationPostSchema);

module.exports = DonationPost;
