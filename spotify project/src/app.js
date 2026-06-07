const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const musicRoutes = require('../src/routes/music.routes');

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', userRoutes);
app.use('/api/music', musicRoutes);

module.exports = app;

