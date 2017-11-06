const router = require('express').Router();

// api router will mount other routers for all our resources
router.use('/auth', require('./auth/authRoutes'));
router.use('/user', require('./user/userRoutes'));
router.use('/graph', require('./graph/graphRoutes'));
router.use('/fund', require('./fund/fundRoutes'));

module.exports = router;
