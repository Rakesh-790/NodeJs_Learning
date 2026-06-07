const express = require('express');
const createMusic = require('../controller/music.controller');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage()});

const router = express.Router();

router.post('/uploadMusic', upload.single('music'), createMusic);

module.exports = router;