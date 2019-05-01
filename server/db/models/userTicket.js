const Sequelize = require('sequelize');
const db = require('../db');

const UserTicket = db.define('user-ticket', {
  start: {
    type: Sequelize.DATE,
  },
  end: {
    type: Sequelize.DATE,
  },
});

module.exports = UserTicket;
