const express = require('express');
const musicController = require('../controller/music.controller');
const multer = require('multer');
const { authArtistCheck, authCheck } = require('../middleware/auth.middleware');
const { uploadMusicSchemaValid, createAlbumSchemaValid } = require('../validation/music.validation');
const validate = require('../middleware/validate.middleware');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/uploadMusic', authArtistCheck, upload.single('music'), validate(uploadMusicSchemaValid), musicController.createMusic);

router.post('/album', authArtistCheck, validate(createAlbumSchemaValid), musicController.createAlbum);

router.post('/playlist', authCheck, musicController.createPlaylist);

router.post('/:playlistId/music', authCheck, musicController.addMusicToPlaylist);

router.get('/playlist', authCheck, musicController.getMyPlaylists);

router.get('/musics', musicController.getAllMusics);

router.get('/personalAlbums', authArtistCheck, musicController.getPersonalAbums);

router.get('/albums', authCheck, musicController.getAllAbums);

router.delete('/:playlistId/music/:musicId', authCheck, musicController.removeMusicFromPlaylist);

router.delete('/:playlistId', authCheck, musicController.deletePlaylist);


module.exports = router;