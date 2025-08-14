/*

  * TutorLK - Backend
  * Description: This is the backend server for TutorLK, a platform for connecting tutors and students.
  * Author: Chamilka Mihiraj Perera
  * Date: 8th October 2023
  * Version: 1.0.0
  * License: MIT
  
*/

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const authenticateToken = require('./Middleware/authMiddleware');

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.DB_URL;


// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const authRoutes = require('./Routes/auth.Routes');
const userRoutes = require('./Routes/user.Routes');
const userPosts = require('./Routes/post-public.Routes');
const postPrivateRoutes = require('./Routes/post-private.Routes');

app.get('/', function (req, res) {
  res.send('Hello World from Express!')
})

// API Routes

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/users/post',userPosts);

// Protected routes
app.use('/api/users', authenticateToken ,userRoutes);
app.use('/api/users/post', authenticateToken ,postPrivateRoutes);


mongoose.connect(MONGO_URI,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database!');
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
.catch(() => {
    console.log("Connection failed");
});