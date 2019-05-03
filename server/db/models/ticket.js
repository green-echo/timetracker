const Sequelize = require('sequelize');
const db = require('../db');

const Ticket = db.define('ticket', { 
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
    },
  },
  status: {
    type: Sequelize.ENUM('to_do', 'in_progress', 'in_review', 'done'),
    allowNull: false,
    defaultValue: 'to_do' 
  },
});

module.exports = Ticket;
