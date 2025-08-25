const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const postRoutes = require('./Routes/post-private.Routes');
const userRoutes = require('./Routes/user.Routes'); 
const classRoutes = require('./Routes/class-private.Route'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/classes', classRoutes);

module.exports = app;
