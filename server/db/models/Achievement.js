const Sequelize = require('sequelize');
const db = require('../db');

const Achievement = db.define('achievement', {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.ENUM,
    values: ['steps', 'distance', 'stairFlights'],
    defaultValue: 'steps',
  },
  goal: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Achievement;
