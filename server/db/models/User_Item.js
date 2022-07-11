const Sequelize = require('sequelize');
const db = require('../db');

const User_Item = db.define('user_item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User_Item;