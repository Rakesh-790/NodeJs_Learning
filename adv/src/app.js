// This file work is only creating the server.

const express = require("express");

const app = express();

app.use(express.json()); // It is an middlewire that give power to express to read the request data.

const allNotes = [];

app.post('/create-notes', (req, res) => {
    // console.log(req.body);
    allNotes.push(req.body); // push all user input notes in the allNotes array.

    // res.status(201).json("Notes created successfully from the User"); // ok but always send json message in object format.
    res.status(201).json({
        message: "notes created successfully by the user",
    });
});

app.get('/notes', (req, res) => {
    req.body;

    res.status(200).json({
        message: "all notes are fetched",
        notes: allNotes
    });
});

app.get('/notes-id/:index', (req, res)=>{
    const index = req.params.index;

    res.status(200).json({
        message: "notes fetched by index",
        note: allNotes[index]
    });
});

app.delete('/notes/:index', (req, res) => {
    const index = req.params.index;

    delete allNotes[index];

    res.status(200).json({
        message: `${index} index note deleted successfully`
    });
});

app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;


    const { title, description } = req.body;

    if (title !== undefined) {
        allNotes[index].title = title;
    }

    if (description !== undefined) {
        allNotes[index].description = description;
    }

    res.status(200).json({
        message: `${index} index note updated successfully`
    });
});

module.exports = app;