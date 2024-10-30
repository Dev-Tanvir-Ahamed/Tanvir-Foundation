// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const corsOptions = require('./config/corsOptions');
// const client = require('./config/db');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors(corsOptions));
// app.use(express.json());
// // app.use('/uploads', express.static('uploads'));

// // Import Routes
// const authRoutes = require('./routes/authRoutes');
// // const donationRoutes = require('./routes/donationRoutes');
// // const paymentRoutes = require('./routes/paymentRoutes');

// // Use Routes
// app.use('/api/v1/auth', authRoutes);
// // app.use('/api/v1/donation', donationRoutes);
// // app.use('/api/v1/payment', paymentRoutes);

// // MongoDB Connection
// client.connect().then(() => {
//   console.log('Connected to MongoDB');
//   app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
// }).catch(console.error);
