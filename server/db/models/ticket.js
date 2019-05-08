const Sequelize = require('sequelize');
const db = require('../db');

const Ticket = db.define('ticket', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  status: {
    type: Sequelize.ENUM('to_do', 'in_progress', 'in_review', 'done'),
    allowNull: false,
    defaultValue: 'to_do'
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    min: 0
  }
});

Ticket.maxOrder = async function(status) {
  const max = await Ticket.findAll({
    where: {
      status
    },
    attributes: [Sequelize.fn('MAX', Sequelize.col('order'))],
    raw: true
  });
  return max;
};

module.exports = Ticket;
