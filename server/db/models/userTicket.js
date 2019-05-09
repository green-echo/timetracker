const Sequelize = require('sequelize');
const db = require('../db');

const UserTicket = db.define('user-ticket', {
  start: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    
  },
  end: {
    type: Sequelize.DATE,
  },
});

module.exports = UserTicket;
