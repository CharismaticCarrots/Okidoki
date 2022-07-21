const Sequelize = require('sequelize');
const db = require('../db');

const User_Achievement = db.define('user_achievement', {
  progress: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  obtained: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User_Achievement;
