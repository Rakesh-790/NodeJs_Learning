const express = require('express');
const { registerUser, loginUser, logoutUser, getAllUser, refreshToken } = require('../controller/user.controller');
const { registerSchemaValid, loginSchemaValid } = require('../validation/auth.validation');
const validate = require('../middleware/validate.middleware');
const { authCheck } = require('../middleware/auth.middleware');


const router = express.Router();

router.post('/register', validate(registerSchemaValid), registerUser);

router.post('/login', validate(loginSchemaValid), loginUser);

router.post('/logout', logoutUser);

router.post('/refresh', refreshToken);

router.get('/users', getAllUser);


module.exports = router;