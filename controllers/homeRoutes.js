const router = require('express').Router();
// const withAuth = require('../utils/auth');
const { Anime, Preferences } = require('../models')

router.get('/', async(req, res) => {

    console.log(req.session)

    if (req.session.loggedIn) {
        if (req.session.onboarded) {
            // can do some db queries with the user preferences that we have access to 
            res.render("anime", {
                loggedIn: req.session.loggedIn,
                animeData: [],
            });
        } else {
            console.log("we are loggd in", req.session)
            const p = await Preferences.findOne({ where: { user_id: req.session.user_id } })

            res.render('userpage', {

                loggedIn: req.session.loggedIn,
                animeData: [],
                genres: p

            });
        }

    } else {
        console.log('we are there')
        res.render('homepage');
    }
});


router.get('/anime/:id', async(req, res) => {
    console.log(req.session)
    console.log("we are logged in")
    if (req.session.loggedIn) {
        try {
            const dbAnimeData = await Anime.findByPk(req.params.id, {
                include: [{
                    model: Anime,
                    attributes: [
                        'name',
                        'genre',
                        'type',
                        'episodes',
                        'rating',
                    ],
                }, ],
            });

            const anime = dbAnimeData.get({ plain: true });
            console.log(anime);
            res.render('animepage', {
                loggedIn: req.session.loggedIn,
                anime,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        console.log('we are there')
        res.render('animepage');
    }
});


module.exports = router;