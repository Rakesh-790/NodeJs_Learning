const express = require('express');
const PostModel = require('./models/post.model');
const multer = require('multer');
const uploadImage = require('./service/storage.service');

const app = express();
// app.use(express.json()); // here we are not using this because we are using the form-data to send the data.

const upload = multer({ storage: multer.memoryStorage() });


app.post('/create-post', upload.single('image'), async (req, res) => {
    const imageUrl = await uploadImage(req.file.buffer);

    res.status(201).json({
        message: "Post created successfully",
        imageUrl: imageUrl.url,
    });

    const post = new PostModel({
        imageUrl: imageUrl.url,
        caption: req.body.caption,
    });

    await post.save();
}); 

app.get('/posts', async (req, res) => {
    const posts = await PostModel.find();

    res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts,
    });
});

app.get('/posts/:id', async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    res.status(200).json({
        message: "Post fetched successfully through id",
        post: post,
    });
});
module.exports = app;