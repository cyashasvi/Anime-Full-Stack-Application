const router = require('express').Router();
const preferenceRoutes = require('./preferenceRoutes');
const usersRoute = require('./usersRoute');


router.use('/users', usersRoute);
router.use('/preferences', preferenceRoutes);

module.exports = router;