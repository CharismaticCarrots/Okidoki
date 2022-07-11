const db = require('./db');
const Doki = require('./models/Doki');
const User = require('./models/User');
const User_Doki = require('./models/User_Doki');
const Item = require('./models/Item')
const User_Item = require('./models/User_Item')

User.belongsToMany(Doki, { through: User_Doki });
Doki.belongsToMany(User, { through: User_Doki });

User.belongsToMany(Item, { through: User_Item });
Item.belongsToMany(User, { through: User_Item });

module.exports = {
  db,
  Doki,
  User,
  User_Doki,
  User_Item,
  Item
};
