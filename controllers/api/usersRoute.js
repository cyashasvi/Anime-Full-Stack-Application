const router = require("express").Router();
const { User, Preferences } = require("../../models");
// /api/users/

router.post("/", async(req, res) => {
    console.log("HITTING API USERS POST", req);
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(dbUserData);

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/login", async(req, res) => {


    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            },
            //include: { model :  Preferences , as : 'preferences'}
        });
        const user = userData.get({ plain: true });
        console.log("user", user);
        // console.log("userData", userData);
        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        req.session.user_id = user.id
        req.session.loggedIn = true
        req.session.onboarded = true

        console.log(user.onboarding)

        if (user.onboarding) {
            return res.render("userpage", { loggedIn: true })
        } else {
            const p = await Preferences.findOne({ where: { user_id: user.id } })
            return res.render("anime", { genres: p, loggedIn: true })
        }

        return res.render("userpage")
        return res.json({ hello: 'world' })

        if (user.onboarding) {
            // res.json(user.Preference.preferredGenre)
            res.render('test')

        } else {
            const genres = user.Preference.preferredGenre;
            res.render('anime', { genres })
        }
        // res.json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// router.get('/user/:id', async(req, res) => {
//     try {
//         const userData = await User.findByPk(req.params.id, {})
//     }
//     req.session.save(() => {
//         if (req.session.countVisit) {
//             req.session.countVisit++;
//         } else {
//             req.session.countVisit = 1;
//         }
//     })
// });

// /api/users/7558
// router.get('/user/:id', async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.params.id, {})
//     }

//     req.session.save(() => {
//         if (req.session.countVisit) {
//             req.session.countVisit ++;
//         } else {
//             req.session.countVisit = 1;
//         }
//     })
// });

module.exports = router;