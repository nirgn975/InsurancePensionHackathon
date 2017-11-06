const router = require('express').Router();
const controller = require('./fundController');
const auth = require('../auth/auth');

router.route('/')
  .get([auth.decodeToken(), auth.getFreshUser()], controller.ownData);

module.exports = router;
