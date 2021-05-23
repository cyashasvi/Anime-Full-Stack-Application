const router = require('express').Router();
const { Anime } = require('../../models');
const { sequelize } = require('../../models/User');
const { Op } = require('sequelize');

// GET all Anime
router.get('/', async(req, res) => {
    try {
        const animeData = await Anime.findAll();
        res.status(200).json(animeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET a Single Anime
// router.get('/:id', async(req, res) => {
//     try {
//         const animeData = await Anime.findByPk(req.params.id);
//         // const animeData = await Anime.findOne({where: { anime_id: req.params.id}}); how to call a key without without having to use findbyPk
//         // console.log(animeData);
//         if (!animeData) {
//             res.status(404).json({ message: 'No Anime found!' });
//             return;
//         }
//         res.status(200).json(animeData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Get Anime by Genre
router.get('/genre/:genre', async(req, res) => {



    try {

        const animeData = await Anime.findAll({
            where: {
                genre: {
                    [Op.regexp]: `${req.params.genre}`
                },
            },
            limit: 10
        });

        // const animeData = await Anime.findOne({where: { anime_id: req.params.id}}); //how to call a key without without having to use findbyPk
        console.log(animeData);
        if (!animeData) {
            res.status(404).json({ message: 'No Anime found!' });
            console.log(animeData);
            return;
        }else{
            // res.render('anime', {animeData})
        }
        res.status(200).json(animeData);
        // res.render('anime', {animeData})
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/single/:genre', async(req, res) => {

// const animeD = await Anime.findAll();
// res.json(animeD)

    try {

        const animeData = await Anime.findAll({
            where: {
                genre: {
                    [Op.like]: `${req.params.genre}`
                },
            },
            limit: 10
        });

        // const animeData = await Anime.findOne({where: { anime_id: req.params.id}}); //how to call a key without without having to use findbyPk
        console.log(animeData);
        if (!animeData) {
            res.status(404).json({ message: 'No Anime found!' });
            console.log(animeData);
            return;
        }else{
            res.redirect('anime', {animeData})
        }
        // res.status(200).json(animeData);
        // res.render('anime', {animeData})
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;