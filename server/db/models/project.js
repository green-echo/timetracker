const Sequelize = require('sequelize');
const db = require('../db');

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  totalTime: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  toDo: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  inProgress: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  inReview: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  done: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
});

Project.prototype.appendTicketId = async function(ticketId) {
  try {
    await this.update({
      toDo: Sequelize.fn('array_append', Sequelize.col('toDo'), ticketId)
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = Project;
