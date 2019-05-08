const router = require('express').Router();
const { UserTicket, User, Ticket } = require('../db/models');
const Sequelize = require('sequelize');
module.exports = router;

// returns all usertickets for a specific userId
router.get('/:userId', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const user = await User.findByPk(Number(req.params.userId));
      if (!user) {
        next();
      } else {
        const usertickets = await user.getUserTickets();
        res.json(usertickets);
      }
    }
  } catch (error) {
    next(error);
  }
});

// returns all usertickets for a specific ticketId
router.get('/:ticketId', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const ticket = await Ticket.findByPk(Number(req.params.ticketId));
      if (!ticket) {
        next();
      } else {
        const usertickets = await ticket.getUserTickets();
        res.json(usertickets);
      }
    }
  } catch (error) {
    next(error);
  }
});

// returns the open userTicket for a specific ticketId
// NOT IMPLEMENTED YET
router.get('/:ticketId/open', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const ticket = await Ticket.findByPk(Number(req.params.ticketId));
      if (!ticket) {
        next();
      } else {
        const usertickets = await ticket.getUserTickets();
        res.json(usertickets);
      }
    }
  } catch (error) {
    next(error);
  }
});

// for adding an end to a userTicket
router.put('/:id', async (req, res, next) => {
  try {
    // if (!req.isAuthenticated()) {
    //   res.sendStatus(403);
    // } else {
    // const { end } = req.body;
    const userTicket = await UserTicket.findByPk(Number(req.params.id));
    // if (userTicket.userId != req.user.id) {
    if (userTicket.userId != 1) {
      res.sendStatus(403);
    }
    if (!userTicket) {
      next();
    } else {
      const updatedTicket = await userTicket.update({
        end: Sequelize.literal('CURRENT_TIMESTAMP')
      });
      res.json(updatedTicket);
    }
    // }
  } catch (error) {
    next(error);
  }
});

// for creating a userTicket with a given start
router.post('/:ticketId', async (req, res, next) => {
  try {
    // if (!req.isAuthenticated()) {
    //   res.sendStatus(403);
    // } else {
    // const { start } = req.body;
    const user = 1;
    const ticket = await Ticket.findByPk(Number(req.params.ticketId));
    // Check that the user starting is the user assigned to the ticket
    if (ticket.userId != 1) {
      res.sendStatus(403);
    }
    if (!ticket) {
      next();
    } else {
      // const userTicket = await UserTicket.create(start);
      const userTicket = await UserTicket.create();
      await userTicket.setUser(user);
      await userTicket.setTicket(ticket);
      res.json(userTicket);
      // }
    }
  } catch (error) {
    next(error);
  }
});
