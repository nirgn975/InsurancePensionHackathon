const router = require('express').Router();
const controller = require('./graphController');
const auth = require('../auth/auth');

router.route('/:kind')
  .get([auth.decodeToken(), auth.getFreshUser()], controller.getByKind);

module.exports = router;
