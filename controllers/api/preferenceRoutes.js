const router = require('express').Router();
const { Preferences, User } = require('../../models');

// this root route will always refer to the curent user by session id 
router.get('/', async(req, res) => {
    try {
        //console.log("session is", req.session)
        const pdata = await Preferences.findOne({ where: { user_id: req.session.user_id } });
        //console.log("user data is", pdata)
        if (!pdata) {
            res.status(404).json({ message: 'No Preferences found!' });
            return;
        }
        res.status(200).json(pdata);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async(req, res) => {
    try {
        const prefData = await Preferences.findByPk(req.params.id);
        if (!prefData) {
            res.status(404).json({ message: 'No Preferences found!' });
            return;
        }
        res.status(200).json(prefData);
    } catch (err) {
        res.status(500).json(err);
    }
});

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
        // res.render('preferences', {
        //     preferences,
        //     countVisit: req.session.countVisit,
        // });

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

    const data = req.body.preferredGenre.join(",");

    const obj = {
        preferredGenre: data,
        user_id: req.session.user_id

    }
    console.log(obj)
    try {
        const prefData = await Preferences.create({ user_id: obj.user_id, preferredGenre: obj.preferredGenre });
        await User.update({ onboarding : true }, { where :  { id : req.session.user_id}})

        req.session.id = user_id;
        req.session.onboarded = true; 
        console.log(prefData);
        res.status(200).json(prefData);
    } catch (err) {
        res.status(400).json(err);
    }
});




module.exports = router;