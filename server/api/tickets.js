const router = require('express').Router();
const { Ticket, User, Project } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allTickets = await Ticket.findAll();
    res.json(allTickets);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(Number(req.params.id));
    if (!ticket) {
      next();
    } else {
      res.json(ticket);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/users', async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(Number(req.params.id));
    if (!ticket) {
      next();
    } else {
      const users = await ticket.getUsers();
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, points, status } = req.body;
    const newTicket = await Ticket.create({
      title,
      description,
      points,
      status
    });
    res.json(newTicket);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, points, status, userId } = req.body;
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      next();
    } else {
      await ticket.update({
        title,
        description,
        points,
        status,
        userId
      });

      if (userId) {
        await ticket.setUser(Number(userId));
      }

      res.json(ticket);
    }
  } catch (error) {
    next(error);
  }
});
