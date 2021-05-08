const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Anime extends Model {}

Anime.init({
    anime_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    episodes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    members: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Anime',
});

module.exports = Anime;