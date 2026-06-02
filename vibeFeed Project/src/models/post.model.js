const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
}); // schema is a blueprint of the document. like how the collection look like.

const PostModel = mongoose.model('Post', postSchema); // it create the table or collection in the database.

module.exports = PostModel;