const router = require('express').Router();
// const withAuth = require('../utils/auth');

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

module.exports = router;