const router = require('express').Router();
const preferenceRoutes = require('./preferenceRoutes');
const usersRoute = require('./usersRoute');
const animeRoutes = require('./animeRoutes')


router.use('/users', usersRoute);
router.use('/preferences', preferenceRoutes);
router.use('/anime', animeRoutes);

module.exports = router;