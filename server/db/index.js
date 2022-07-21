const db = require('./db');
const Doki = require('./models/Doki');
const User = require('./models/User');
const User_Doki = require('./models/User_Doki');
const Item = require('./models/Item');
const User_Item = require('./models/User_Item');
const Achievement = require('./models/Achievement');
const User_Achievement = require('./models/User_Achievement');

User.belongsToMany(Doki, { through: User_Doki });
Doki.belongsToMany(User, { through: User_Doki });

User.belongsToMany(Item, { through: User_Item });
Item.belongsToMany(User, { through: User_Item });

User.belongsToMany(Achievement, { through: User_Achievement });
Achievement.belongsToMany(User, { through: User_Achievement });

module.exports = {
  db,
  User,
  Doki,
  Item,
  Achievement,
  User_Doki,
  User_Item,
  User_Achievement,
};
