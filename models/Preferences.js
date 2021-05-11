const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Preferences extends Model {}

Preferences.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    preferredGenre: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
            model: 'User',
            key: 'id',
        }
    },

}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Preferences',
});

module.exports = Preferences;