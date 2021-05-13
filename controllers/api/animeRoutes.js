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
        const animeData = await Anime.findByPk(req.params.id);
        // const animeData = await Anime.findOne({where: { anime_id: req.params.id}}); how to call a key without without having to use findbyPk
        console.log(animeData);
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