const router = require('express').Router();

// const animeRoutes = require('./api/animeRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js')

// const preferenceRoutes = require('./api/preferenceRoutes');

router.use('/', homeRoutes);    // serve the pages, localhost:300/signup
router.use('/api', apiRoutes); //serve the data, localhost:300/api/anime /998383
// router.use('/preferences', preferenceRoutes);

module.exports = router;