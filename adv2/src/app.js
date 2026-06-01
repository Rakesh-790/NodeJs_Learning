const express = require('express');
const noteModel = require('./models/notes.model')

const app = express();
app.use(express.json());

app.post('/notes', async (req, res) => {
    const data = req.body;
    await noteModel.create({
        title: data.title,
        description: data.description 
    });

    res.status(201).json({
        message: "notes created successfully"
    });
});

app.get('/notes', async (req, res) =>{
    const notes = await noteModel.find(); // for finding all notes
    //there many methods of Model like find, findOne, findById etc.
    // find always return an array of object and if nothing found it returns empty array.
    // findOne always return an object and if nothing found it returns "null".

    res.status(200).json({
        message: "all notes fetched successfully",
        notes: notes
    });
});

app.get('/notes/:id', async (req, res) =>{
    const id = req.params.id;

    const note = await noteModel.findOne({_id: id}); // for finding a single note

    res.status(200).json({
        message: "note fetched successfully",
        note: note
    });
});


app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id;

    await noteModel.findOneAndDelete({_id: id}); // for deleting a single note

    res.status(200).json({
        message: "note deleted successfully"
    });
});

app.patch('/notes/:id', async (req, res) =>{
    const id = req.params.id;

    const { title, description } = req.body;

    await noteModel.findOneAndUpdate({_id: id}, {title, description});

    res.status(200).json({
        message: "note updated successfully"
    });
})

module.exports = app;