const router = require('express').Router();
const { UserTicket, User, Ticket } = require('../db/models');
module.exports = router;

// returns all usertickets for a specific userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(Number(req.params.userId));
    if (!user) {
      next();
    } else {
      const usertickets = await user.getUserTickets();
      res.json(usertickets);
    }
  } catch (error) {
    next(error);
  }
});

// returns all usertickets for a specific ticketId
router.get('/:ticketId', async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(Number(req.params.ticketId));
    if (!ticket) {
      next();
    } else {
      const usertickets = await ticket.getUserTickets();
      res.json(usertickets);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {});

router.post('/:ticketId', async (req, res, next) => {});
