const router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const controller = require('./authController');

router.post('/signin', verifyUser(), controller.signin);

module.exports = router;
