const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Anime extends Model {}

Anime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    show_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    season_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date_released: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'anime',
  }
);

module.exports = Anime;