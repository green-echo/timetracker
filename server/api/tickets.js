/* eslint-disable no-lonely-if */
const router = require('express').Router();
const { Ticket, User, Project } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const allTickets = await Ticket.findAll();
      res.json(allTickets);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const ticket = await Ticket.findByPk(Number(req.params.id));
      const project = await Project.findByPk(ticket.projectId);

      if (!ticket || !project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          res.json(ticket);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/user', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const ticket = await Ticket.findByPk(Number(req.params.id));
      const project = await Project.findByPk(ticket.projectId);
      if (!ticket || !project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          const user = await ticket.getUser();
          if (!user) {
            next();
          } else {
            res.json(user);
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const { title, description, points, status } = req.body;
      const newTicket = await Ticket.create({
        title,
        description,
        points,
        status
      });
      res.json(newTicket);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const { title, description, points, status, userId } = req.body;
      const ticket = await Ticket.findByPk(req.params.id);
      const project = await Project.findByPk(ticket.projectId);
      if (!ticket || !project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          await ticket.update({
            title,
            description,
            points,
            status
          });
        }
        if (userId) {
          const user = await User.findByPk(userId);
          if (user) {
            await ticket.setUser(user);
            ticket.currentUserEmail = user.email;
          }
        }

        res.json(ticket);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const ticket = await Ticket.findByPk(Number(req.params.id));
      const project = await Project.findByPk(ticket.projectId);
      if (!ticket || !project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          await ticket.destroy();
          res.sendStatus(200);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});
