const db = require('./db');

const Doki = require('./models/Doki')
const User = require('./models/User')
const User_Doki = require('./models/User_Doki')
// Model Assocations

User.belongsToMany(Doki, { through: User_Doki })
Doki.belongsToMany(User, { through: User_Doki })




module.exports = {
  db,
  Doki,
  User, 
  User_Doki
};
