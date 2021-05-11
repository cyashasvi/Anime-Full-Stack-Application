const router = require('express').Router();
const {User} = require('../../models');

router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

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