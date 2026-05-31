const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    description: String
});

const noteModel = mongoose.model('notes', schema);

module.exports = noteModel;