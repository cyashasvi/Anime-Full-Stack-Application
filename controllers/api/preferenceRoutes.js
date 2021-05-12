const router = require('express').Router();
const {Preferences} = require('../../models');

router.get('/preferences/:id', async (req, res) => {
    // try {
    //      const prefData = await Preferences.findByPk(req.params.id, {
    //          include: [
    //              {
    //              model: Preferences,
    //              attributes: [
    //                  'id',
    //                  'preferredGenre',
    //                  'genre_id',
    //              ],
    //              },
    //             ],
    //      });
    //  }


    // req.session.save(() => {
    //     if (req.session.countVisit) {
    //         req.session.countVisit ++;
    //     } else {
    //         req.session.countVisit = 1;
    //     }
    // })
});

module.exports = router;
