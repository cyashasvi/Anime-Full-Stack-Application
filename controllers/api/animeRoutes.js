const router = require('express').Router();
const {Anime} = require('../../models');

// GET all Anime
// router.get('/', async (req, res) => {
//     try {
//         const animeData = await Anime.findAll();
//         res.status(200).json(animeData);
//     } catch (err) {
//         res.status(500).json(err);
//     } 
// });

//GET a Single Anime
router.get('/:id', async (req, res) => {
    try {
        const animeData = await Anime.findbyPK(req.params.id);
        if (!animeData) {
            res.status(404).json({message: 'No Anime found!'});
            return;
        }
    res.status(200).json(animeData);
    } catch (err) {
        res.status(500).json(err);
    }        
});


module.exports = router;