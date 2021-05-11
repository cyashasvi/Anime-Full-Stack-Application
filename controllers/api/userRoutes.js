const router = require('express').Router();
const {User} = require('../../models');

router.get('/user/:id', async (req, res) => {
    // try {
    //     const userData = await User.findByPk(req.params.id, {})
    // }


    req.session.save(() => {
        if (req.session.countVisit) {
            req.session.countVisit ++;
        } else {
            req.session.countVisit = 1;
        }
    })
});


