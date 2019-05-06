/* eslint-disable no-lonely-if */
const router = require('express').Router();
const { Project, Ticket, User } = require('../db/models');
module.exports = router;

router.get('/all', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      const allProjects = await Project.findAll();
      res.json(allProjects);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      const project = await Project.findByPk(Number(req.params.id));
      if (!project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          res.json(project);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

// add a ticket to a specific project
router.post('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      const { title, description, points } = req.body;
      const project = await Project.findByPk(Number(req.params.id));
      if (!project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          const newTicket = await Ticket.create({
            title,
            description,
            points
          });

          await newTicket.setProject(project);

          res.json(newTicket);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/tickets', async (req, res, next) => {
  console.log('hitting correct route');
  try {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      const project = await Project.findByPk(Number(req.params.id));
      console.log('PROJECT', project);
      if (!project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          const tickets = await project.getTickets();
          res.json(tickets);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

/* This route gets all the users for a specifc project  */
router.get('/:id/users', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      const project = await Project.findByPk(Number(req.params.id));
      if (!project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          const users = await project.getUsers();
          res.json(users);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/tickets/:status', async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const status = req.params.status;
    const singleProject = await Project.findOne({
      where: {
        id: Number(projectId),
        status
      },
      include: Ticket
    });
    res.json(singleProject);
  } catch (error) {
    next(error);
  }
});
/* This gets all the projects that belongs to a user */
router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      const user = await User.findByPk(req.user.id);
      const projects = await user.getProjects();
      res.json(projects);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      const { name, totalTime } = req.body;
      const newProject = await Project.create({ name, totalTime });
      await newProject.addUser(req.user);
      res.json(newProject);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      const project = await Project.findByPk(Number(req.params.id));
      if (!project) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          await project.destroy();
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

// add a user to a specific project
