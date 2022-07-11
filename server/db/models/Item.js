const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  itemName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  imageUrl: {
    type: Sequelize.STRING
}
});

module.exports = Item;
