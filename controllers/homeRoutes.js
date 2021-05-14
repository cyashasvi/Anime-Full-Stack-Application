const router = require('express').Router();
// const withAuth = require('../utils/auth');

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

module.exports = router;