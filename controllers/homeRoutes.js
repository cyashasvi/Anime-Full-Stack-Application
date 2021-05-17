const router = require('express').Router();
// const withAuth = require('../utils/auth');
const {Anime} = require('../models')

router.get('/', async (req, res) =>{
    console.log(req.session)
    
    if(req.session.loggedIn){
        if(req.session.onboarded) {
            // can do some db queries with the user preferences that we have access to 
            res.render("anime")
        } else {
            console.log("we are loggd in", req.session)
            res.render('userpage', {
                 loggedIn : req.session.loggedIn
            });
        }

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
            console.log(anime);
            res.render('animepage', {
                loggedIn: req.session.loggedIn,
                 anime,
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