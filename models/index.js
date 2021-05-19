const User = require('./User');
const Anime = require('./Anime');
const Preferences = require('./Preferences')

// User.hasMany(Anime, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

User.hasOne(Preferences, {
    foreignKey: 'user_id'
});
Preferences.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Anime, Preferences };