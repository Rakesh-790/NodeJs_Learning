const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controller/user.controller');
const { registerSchemaValid, loginSchemaValid } = require('../validation/auth.validation');
const validate = require('../middleware/validate.middleware');


const router = express.Router();

router.post('/register', validate(registerSchemaValid), registerUser);

router.post('/login', validate(loginSchemaValid), loginUser);

router.post('/logout', logoutUser);



module.exports = router;