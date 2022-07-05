const db = require('./db');

const Doki = require('./models/Doki')
const User = require('./models/User')
// Model Assocations

Doki.belongsToMany(User, { through: User_Doki })
User.belongsToMany(Doki, { through: User_Doki })



module.exports = {
  db,
  Doki,
  User
};
