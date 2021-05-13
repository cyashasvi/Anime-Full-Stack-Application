const router = require('express').Router();
const { Preferences } = require('../../models');

router.get('/preferences/:id', async(req, res) => {
    try {
        const prefData = await Preferences.findByPk(req.params.id, {
            include: [{
                model: Preferences,
                attributes: [
                    'id',
                    'preferredGenre',
                    'genre_id',
                ],
            }, ],
        });

        const preferences = prefData.get({ plain: true });
        res.render('preferences', {
            preferences,
            countVisit: req.session.countVisit,
        });

        req.session.save(() => {
            if (req.session.countVisit) {
                req.session.countVisit++;
            } else {
                req.session.countVisit = 1;
            };
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

const router = require('express').Router();
const { Preferences } = require('../../models');

router.get('/preferences/:id', async(req, res) => {
    try {
        const prefData = await Preferences.findByPk(req.params.id, {
            include: [{
                model: Preferences,
                attributes: [
                    'id',
                    'preferredGenre',
                    'genre_id',
                ],
            }, ],
        });

        const preferences = prefData.get({ plain: true });
        res.render('preferences', {
            preferences,
            countVisit: req.session.countVisit,
        });

        req.session.save(() => {
            if (req.session.countVisit) {
                req.session.countVisit++;
            } else {
                req.session.countVisit = 1;
            };
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post('/', async(req, res) => {
    const data = req.body.preferredGenre.join();
    const obj = {
        preferredGenre: data,
        user_id: req.session.user_id
    }
    console.log(obj)
    try {
        const prefData = await Preferences.create(obj);
        console.log(prefData);
        res.status(200).json(prefData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

module.exports = router;