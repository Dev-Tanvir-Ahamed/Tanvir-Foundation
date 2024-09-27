const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const path = require("path")
const uniqid = require('uniqid');
const app = express();
const port = process.env.PORT || 5000;
const upload = require("./middleware/upload")
const SSLCommerzPayment = require('sslcommerz-lts')



// Middleware
const allowedOrigins = ["http://localhost:5173", "https://tanvir-foundation.netlify.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true  // Allow sending cookies and credentials
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.use('/public', express.static(path.join(__dirname, 'public')));
// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  connectTimeoutMS: 30000, // Increase the timeout to 30 seconds
  socketTimeoutMS: 45000  // Increase the socket timeout to 45 seconds
   });




async function run() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('assignment');
        const collection = db.collection('users');
        const donationPostsCollection = db.collection('donationPosts');
        const initialDonationCollection = db.collection("donate")
        const createDonationPostsCollection = db.collection("createDonationPosts")
        app.post('/api/v1/register', async (req, res) => {
          const { name, email, password } = req.body;
      
          // Check if email already exists
          const existingUser = await collection.findOne({ email });
          if (existingUser) {
              return res.status(400).json({
                  success: false,
                  message: 'User already exists'
              });
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Insert user into the database
          const data = await collection.insertOne({ name, email, password: hashedPassword });
      
          // Generate JWT token with the user's data
          const token = jwt.sign(
              { id: data.insertedId, name, email },  // Include all necessary details
              process.env.JWT_SECRET,
              { expiresIn: process.env.EXPIRES_IN }
          );
      
          // Send user data along with token
          res.status(201).json({
              success: true,
              message: 'User registered successfully',
              token, // Send the token back
              userData: {
                  id: data.insertedId, 
                  name,
                  email,
              }
          });
      });
      

        // User Login
  // User Login
app.post('/api/v1/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await collection.findOne({ email });
  if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });

  res.json({
      success: true,
      message: 'Login successful',
      token,
      userData: {
          id: user._id,
          name: user.name,
          email: user.email
      }
  });
});


// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided in Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Bearer token missing from Authorization header' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded; // Attach user data to request
    next();
  });
};



        
        // ==============================================================
        // WRITE YOUR CODE HERE
        // ==============================================================

        // get all donation posts

        app.get('/api/v1/donation-posts', async (req, res) => {
            try {
              const posts = await donationPostsCollection.find({}).toArray();
              res.json(posts);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
          });

          app.get('/api/v1/donation-posts/:_id', async (req, res) => {
            try {
              const { _id } = req.params;
             const post = await donationPostsCollection.findOne({ _id: new ObjectId(_id) });
              if (!post) {
                return res.status(404).json({ message: 'Donation post not found' }); 
              }
              res.json(post);
            } catch (err) {
              res.status(500).json({ message: err.message }); // Handle errors
            }
          });
          
        

          // Donate

          app.post("/api/v1/donate", async (req, res) => {
            const { name, email, amount, userId } = req.body;
          
            if (!userId) {
              return res.status(400).json({ message: "User ID is required" });
            }
            try {
              // Store donation data in DB as pending
              const tran_id = uniqid()
              let donation = {
                userId: new ObjectId(userId),
                name,
                email,
                amount,
                tran_id,
                paymentStatus: 'pending',
                paymentDate: null
              };
              console.log(donation);
              
              const savedDonation = await initialDonationCollection.insertOne(donation);
              // console.log('Inserted Donation:', savedDonation);
              // const tran_id = savedDonation.insertedId.toString()
              // SSLCommerz Payment data
              const paymentData = {
                total_amount: amount,
                currency: 'BDT',
                tran_id: tran_id, // Unique transaction ID from MongoDB
                success_url: `https://tanvir-foundation.onrender.com/api/v1/success/${tran_id}`,
                fail_url: 'https://tanvir-foundation.onrender.com/api/v1/fail',
                cancel_url: 'https://tanvir-foundation.onrender.com/api/v1/cancel',
                ipn_url: 'https://tanvir-foundation.onrender.com/api/v1/ipn',
                shipping_method: 'NO',
                product_name: 'Donation',
                product_category: 'Donation',
                product_profile: 'general',
                cus_name: name,
                cus_email: email,
                cus_add1: 'Dhaka',
                cus_add2: '',
                cus_city: 'Dhaka',
                cus_state: '',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: "017*******",
                cus_fax: '',
                ship_name: name,
                ship_add1: 'Dhaka',
                ship_add2: '',
                ship_city: 'Dhaka',
                ship_state: '',
                ship_postcode: '1000',
                ship_country: 'Bangladesh',
              };
          
              // Initialize SSLCommerz
              const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWD, false); // Test mode
              const apiResponse = await sslcz.init(paymentData);
          
              if (apiResponse?.GatewayPageURL) {
                // Send the user to the payment gateway URL
                console.log('Redirecting to payment gateway: ', apiResponse.GatewayPageURL);
                res.json({ redirectUrl: apiResponse.GatewayPageURL });
              } else {
                console.error('Payment initiation failed', apiResponse);
                res.status(500).send('Payment initiation failed');
              }
            } catch (error) {
              console.error('Error processing donation', error);
              res.status(500).send('Payment processing failed');
            }
          });
  
          // const { ObjectId } = require('mongodb');

          app.post('/api/v1/success/:tran_id', async (req, res) => {
            const { tran_id } = req.params; 
            console.log("body", req.params);
            
            console.log('Transaction ID:', tran_id);
            
            try {
                // Find the pending donation by the transaction ID
                const donation = await initialDonationCollection.findOne({ tran_id });
                
                if (!donation) {
                    return res.status(404).json({ message: 'Donation not found' });
                }
        
                // Update the donation status to 'successful'
                const updatedDonation = await initialDonationCollection.updateOne(
                    { tran_id },
                    { 
                        $set: { 
                            paymentStatus: 'successful', 
                            paymentDate: new Date() 
                        } 
                    }
                );

                // res.json({updatedDonation})
                
                
        
                if (updatedDonation.modifiedCount > 0) {
                    // Redirect to the frontend with transaction ID and success message
                    return res.redirect(`http://localhost:5173/donation-success/${tran_id}`);
                } else {
                    res.status(500).json({ message: 'Failed to update donation status' });
                }
                
            } catch (error) {
                console.error('Error fetching transition details', error);
                res.status(500).send('Payment processing failed');
            }
        });

        app.get('/api/v1/success/:tran_id', async (req, res) => {
          const {tran_id} = req.params
          const donarData = await initialDonationCollection.findOne({tran_id})
          if (donarData) {
            res.status(200).json({
              success : true,
              message : "Donar data get successfully",
              data : donarData
            })
          }else{
            res.status(400).json({
              success : false,
              message : "failed to fetch data"
            })
          }
        })
        
          
          
          app.post('/api/v1/fail', (req, res) => {
            // Handle failed payment here
            res.send('Payment failed');
          });
          
          app.post('/api/v1/cancel', (req, res) => {
            // Handle canceled payment here
            res.send('Payment was canceled');
          });


          app.get('/api/v1/user-donation-stats',  async (req, res) => {
            const { email } = req.query;  // Extract the email from the verified JWT token
            console.log(email);
            
            try {
                const donations = await initialDonationCollection.find({ email }).toArray();
                console.log(donations);
                
                if (donations.length === 0) {
                    return res.status(404).json({ message: 'No donations found for this user' });
                }
          
                // Last donation
                const lastDonation = donations[donations.length - 1];
          
                // Total donation count for this user
                const totalDonationNumber = donations.length;
          
                // Minimum donation amount for this user
                const minDonation = donations.reduce((min, donation) => Math.min(min, donation.amount), donations[0].amount);
          
                // Maximum donation amount for this user
                const maxDonation = donations.reduce((max, donation) => Math.max(max, donation.amount), donations[0].amount);
          
                // Total donation sum for this user
                const totalDonationAmount = donations.reduce((total, donation) => total + donation.amount, 0);
          
                // Respond with the statistics
                res.json({
                    lastDonation,
                    totalDonationNumber,
                    minDonation,
                    maxDonation,
                    totalDonationAmount
                });
            } catch (error) {
                console.error('Error fetching user donation stats', error);
                res.status(500).json({ message: 'Server error' });
            }
          });


// Create a new donation post
app.post('/api/v1/create-donation', upload.single('image'), async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  try {
    
    const { category, title, amount, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const imagePath = req.file.path.replace(/\\/g, "/");
    console.log(imagePath);
    
    const imageUrl = `https://tanvir-foundation.onrender.com/${imagePath}`;

    
    // Create new donation post
    const newPost = {
      image: imageUrl,  // Assign the correct image URL
      category,
      title,
      amount,
      description,
    };

    // Save to database
    const response = await createDonationPostsCollection.insertOne(newPost)

    // Respond with the saved post and the image URL
    res.status(201).json({
      success: true,
      message: 'Donation post created successfully',
      data: newPost,
    });
  } catch (error) {
    // Handle error
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/v1/show-donation", async (req, res) => {
  try {
    const response = await createDonationPostsCollection.find({}).toArray();
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "No donations found",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all donation posts",
      data: response
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching donation posts",
      error: error.message
    });
  }
});





          
        
        
        


        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } finally {
  
    }
}

run().catch(console.dir);

// Test route
app.get('/', (req, res) => {
    const serverStatus = {
        message: 'Server is running smoothly',
        timestamp: new Date()
    };
    res.json(serverStatus);
})