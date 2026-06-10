const { z } = require("zod");

const uploadMusicSchemaValid = z.object({
    title: z.string()
        .min(5, "Title is Required")
});


const createAlbumSchemaValid = z.object({
    title: z.string()
        .min(5, "Album name is Required"),

    // musics: z.string()
    //     .min(1, "Please add at least ONE song") //wrong

    musics: z.array(z.string())
        .min(1, "Please add atleast ONE song")
});

module.exports = {uploadMusicSchemaValid, createAlbumSchemaValid};