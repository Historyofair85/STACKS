const router = require('express').Router();
const sneakerRoutes = require('./sneaker-routes');
const userRoutes = require('./user-routes');

router.use('/sneakers', sneakerRoutes);
router.use('/users', userRoutes);

module.exports = router;