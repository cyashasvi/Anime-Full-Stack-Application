const router = require('express').Router();
// const withAuth = require('../utils/auth');
const {Anime} = require('../models')

router.get('/', async (req, res) =>{
    console.log(req.session)
    if(req.session.loggedIn){
        console.log("we are loggd in")
        res.render('userpage', {
             loggedIn : req.session.loggedIn,
             animeData : [], 
        });
    } else {
        console.log('we are there')
        res.render('homepage');
    } 
});


router.get('/anime/:id', async (req, res) =>{    
    console.log(req.session)
    console.log("we are logged in")
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