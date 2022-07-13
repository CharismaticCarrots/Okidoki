const Sequelize = require('sequelize');
const db = require('../db');

const User_Doki = db.define('user_doki', {
  dokiName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  eggColor: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastFedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  lastPlayedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  lastFedFullnessLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 75
  },
  lastPlayedMoodLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 75
  }
});

module.exports = User_Doki;
