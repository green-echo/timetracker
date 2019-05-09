const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

Ticket.maxOrder = async function(status, projectId) {
  const max = await Ticket.findAll({
    where: {
      status,
      projectId
    },
    attributes: [Sequelize.fn('MAX', Sequelize.col('order'))],
    raw: true
  });
  return max;
};

Ticket.insertSameColumn = async function(src, dest, status, projectId) {
  if (src > dest) {
    await Ticket.increment('order', {
      where: {
        status,
        projectId,
        order: { [Op.lt]: src, [Op.gte]: dest }
      },
      raw: true
    });
  }

  if (src < dest) {
    await Ticket.decrement('order', {
      where: {
        status,
        projectId,
        order: { [Op.gte]: src, [Op.lt]: dest }
      },
      raw: true
    });
  }
};

Ticket.prototype.removeFromColumn = async function() {
  await Ticket.decrement('order', {
    where: {
      status: this.status,
      projectId: this.projectId,
      order: { [Op.gt]: this.order }
    },
    raw: true
  });
};

Ticket.insertDiffColumn = async function(status, projectId, dest) {
  await Ticket.increment('order', {
    where: {
      status,
      projectId,
      order: { [Op.gte]: dest }
    },
    raw: true
  });
};

module.exports = Ticket;
