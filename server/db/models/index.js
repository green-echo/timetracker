const User = require('./user');
const Project = require('./project');
const Ticket = require('./ticket');
const UserTicket = require('./userTicket');

Project.belongsToMany(User, { through: 'user-project' });
User.belongsToMany(Project, { through: 'user-project' });

User.hasMany(Ticket);
Ticket.belongsTo(User);

User.hasMany(UserTicket);
UserTicket.belongsTo(User);

Ticket.hasMany(UserTicket);
UserTicket.belongsTo(Ticket);

Project.hasMany(Ticket);
Ticket.belongsTo(Project);

module.exports = {
  User,
  Project,
  Ticket,
  UserTicket
};
