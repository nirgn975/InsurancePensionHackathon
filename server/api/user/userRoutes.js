const router = require('express').Router();
const controller = require('./userController');
const auth = require('../auth/auth');

// setup boilerplate route jsut to satisfy a request for building.
router.param('id', controller.params);
router.get('/me', [auth.decodeToken(), auth.getFreshUser()], controller.me);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put([auth.decodeToken(), auth.getFreshUser()], controller.put)
  .delete([auth.decodeToken(), auth.getFreshUser()], controller.delete);

module.exports = router;
