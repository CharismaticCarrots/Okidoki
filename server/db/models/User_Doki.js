const Sequelize = require('sequelize')
const db = require('../db')

const User_Doki = db.define('user_doki', {
  dokiName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  moodLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 75,
    min: 0,
    max: 100
  },
  hungerLevel: {
    type: Sequelize.INTEGER,
    defaultValue: 75,
    min: 0,
    max: 100
  },
  isEgg: {
    type: Sequelize.BOOLEAN,
    defaultValue: "true"
  }
})