const router = require('express').Router();

const animeRoutes = require('./api/animeRoutes');

const preferenceRoutes = require('./api/preferenceRoutes');

router.use('/', animeRoutes);

router.use('/preferences', preferenceRoutes);

module.exports = router;