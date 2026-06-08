const express = require('express');
const musicController = require('../controller/music.controller');
const multer = require('multer');
const authArtistCheck = require('../middleware/auth.middleware');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/uploadMusic', authArtistCheck, upload.single('music'), musicController.createMusic);

router.post('/album', authArtistCheck, musicController.createAlbum);

router.get('/', musicController.getAllMusics); 



module.exports = router;