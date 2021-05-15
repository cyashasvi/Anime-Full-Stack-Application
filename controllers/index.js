const router = require('express').Router();

// const animeRoutes = require('./api/animeRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js')
const animePage = require('./api/animePage')

// const preferenceRoutes = require('./api/preferenceRoutes');

router.use('/', homeRoutes);    // serve the pages, localhost:300/signup
router.use('/api', apiRoutes); //serve the data, localhost:300/api/anime /998383
// router.use('/preferences', preferenceRoutes);
router.use('/animePage', animePage)
module.exports = router;