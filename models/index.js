const User = require('./User');
const Anime = require('./Anime');
const Preferences = require('./Preferences')

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { User, Anime, Preferences };