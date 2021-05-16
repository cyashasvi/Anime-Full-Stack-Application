const router = require('express').Router();
const {Anime} = require('../../models');
//const withAuth = require('../utils/auth');

router.get('/anime/:id', async (req, res) =>{    
    console.log(req.session)
    console.log("we are loggd in")
    if(req.session.loggedIn){
        try {
            const dbAnimeData = await Anime.findByPk(req.params.id, {
                include: [
                    {
                    model: Anime,
                    attributes: [
                        'name',
                        'genre',
                        'type',
                        'episodes',
                        'rating',    
                    ],
                    },
                ],
            });

            const anime = dbAnimeData.get({plain: true});
            res.render('animepage', {
                loggedIn: req.session.loggedIn,
                dbAnimeData: anime,
            });
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        console.log('we are there')
        res.render('animepage');
    } 
});

module.exports = router;