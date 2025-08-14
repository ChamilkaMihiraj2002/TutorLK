const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const postRoutes = require('./Routes/post-private.Routes'); // adjust path
const userRoutes = require('./Routes/user.Routes'); // adjust path

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

module.exports = app;
