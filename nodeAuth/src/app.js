const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());// it is also an middlewire which is used to store document in cookies in nodeJs.

app.use(
    '/api/auth',
    authRoutes
)

app.use('/api/post', postRoutes);

module.exports = app;