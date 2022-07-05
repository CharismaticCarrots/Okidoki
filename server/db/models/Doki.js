const Sequelize = require('sequelize')
const db = require('../db')

const Doki = db.define('doki', {
    type: {
        type: Sequelize.ENUM,
        values: ['bunny', 'cat', 'fox'],
        defaultValue: 'cat'
    },
    spriteSheet: {
        type: Sequelize.JSON
    }
})

module.exports = Doki