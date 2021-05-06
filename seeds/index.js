const sequelize = require('../config/connection');
const Anime = require('../models/Anime');
const animeData = require('./animeData.json');



const seedDatabase = async() => {
    await sequelize.sync({ force: true });

    await Anime.bulkCreate(animeData, {
        individualHooks: true,
        returning: true,
    });


    process.exit(0);
};

seedDatabase();