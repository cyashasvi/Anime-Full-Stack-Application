const router = require('express').Router();
const session = require('express-session');
// const withAuth = require('../utils/auth');
const {Anime, Preferences, User } = require('../models')
let onboarded = {};
router.get('/', async (req, res) =>{
// console.log("HOMEROUTES REQUEST: ", req);
    if(req.session.loggedIn){
        onboarded = await User.findOne({ where: { id: req.session.user_id }});
        console.log("what is here",onboarded);
    if(onboarded.onboarding){
        const userPrefs = await Preferences.findOne({ where: { user_id: req.session.user_id }})
        res.render("anime", {
            loggedIn : req.session.loggedIn,
            anime : [], 
            userPrefs
       });
    }else {
        res.render('userpage', {
        
        loggedIn : req.session.loggedIn,
        // animeData : [], 
        // genres : p
        });
    }
 } else {
        res.render('homepage')
        return;
    } 
});

module.exports = router;
    // if(req.session.onboarded == true){     // if (!onboarded)
    //     console.log("am i here")
    //     const userPrefs = await Preferences.findOne({ where: { user_id: req.session.user_id }})
    //     // const onboarded = await User.findOne({ where: { id: req.session.user_id }});
    //     // console.log("who is this", onboarded)
    //     res.render("anime", {
    //                     loggedIn : req.session.loggedIn,
    //                     anime : [], 
    //                     userPrefs
    //                })
    // } else
    // if(req.session.loggedIn){
        
    //     res.render('userpage', {
        
    //         loggedIn : req.session.loggedIn,
    //         // animeData : [], 
    //         // genres : p

    //    })
    // }
    //    }; if(onboarded) {
    //     const userPrefs = await Preferences.findOne({ where: { user_id: onboarded.id }})
    //         res.render("anime", {
    //             loggedIn : req.session.loggedIn,
    //             anime : [], 
    //             userPrefs
    //        })
//             else {
//                 res.render('homepage')
//             }; 
//  });


// router.get('/anime/:id', async (req, res) =>{    
//     console.log(req.session)
//     console.log("we are logged in")
//     if(req.session.loggedIn){
//         try {
//             const dbAnimeData = await Anime.findByPk(req.params.id, {
//                 include: [
//                     {
//                     model: Anime,
//                     attributes: [
//                         'name',
//                         'genre',
//                         'type',
//                         'episodes',
//                         'rating',    
//                     ],
//                     },
//                 ],
//             });

//             const anime = dbAnimeData.get({plain: true});
//             console.log(anime);
//             res.render('animepage', {
//                 loggedIn: req.session.loggedIn,
//                  anime,
//             });
//         } catch(err) {
//             res.status(500).json(err);
//         }
//     } else {
//         console.log('we are there')
//         res.render('animepage');
//     } 
// });


