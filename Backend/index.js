require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const authenticateToken = require('./Middleware/authMiddleware');

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.DB_URL;


// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const userPosts = require('./Routes/postRoutes');

app.get('/', function (req, res) {
  res.send('Hello World from Express!')
})

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken ,userRoutes);
app.use('/api/users/post', authenticateToken ,userPosts);


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