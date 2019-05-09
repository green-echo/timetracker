/* eslint-disable no-case-declarations */
/* eslint-disable no-lonely-if */
const router = require('express').Router();
const { Project, Ticket, User } = require('../db/models');
module.exports = router;

router.get('/all', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
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
    if (!req.isAuthenticated()) {
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
          // console.log(project);
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
    if (!req.isAuthenticated()) {
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
          const maxOrder = await Ticket.maxOrder('to_do', project.id);

          const order = maxOrder[0].max + 1;

          const newTicket = await Ticket.create({
            title,
            description,
            points,
            order
          });

          await newTicket.setProject(project);

          await project.appendTicketId(newTicket.id);

          res.json(newTicket);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/tickets', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
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
          const statuses = ['to_do', 'in_progress', 'in_review', 'done'];

          let tickets = {
            to_do: [],
            in_progress: [],
            in_review: [],
            done: []
          };

          for (let i = 0; i < statuses.length; i++) {
            tickets[statuses[i]] = await Ticket.findAll({
              where: {
                projectId: req.params.id,
                status: statuses[i]
              },
              order: [['order', 'ASC']]
            });
          }

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
    if (!req.isAuthenticated()) {
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

// possibly change this, only require id attributes, to guarantee one source of truth
router.get('/:id/tickets/:status', async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const status = req.params.status;

    const ticketIds = await Ticket.findAll({
      where: {
        projectId,
        status
      },
      attributes: ['id']
    });

    const idArr = ticketIds.map(x => x.id);

    res.json(idArr);
  } catch (error) {
    next(error);
  }
});
/* This gets all the projects that belongs to a user */
router.get('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
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
    if (!req.isAuthenticated()) {
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
    if (!req.isAuthenticated()) {
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
router.put('/:id/adduser', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      const { email } = req.body;
      const project = await Project.findByPk(req.params.id);
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!project || !user) {
        next();
      } else {
        const authorized = await project.hasUser(req.user);
        if (!authorized) {
          res.sendStatus(403);
        } else {
          if (!user) {
            next();
          } else {
            const exists = await project.hasUser(user);
            if (!exists) {
              await project.addUser(user);
            }
          }
        }
        res.json(project);
      }
    }
  } catch (error) {
    next(error);
  }
});

// changing a project (not including adding users)
// eslint-disable-next-line complexity
router.put('/:id', async (req, res, next) => {
  let toDo, inProgress, inReview, done;
  try {
    if (!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      console.log(req.body);
      const { name, totalTime, col1, col2 } = req.body;

      switch (col1.id) {
        case 1:
          toDo = col1.taskIds;
          break;
        case 2:
          inProgress = col1.taskIds;
          break;
        case 3:
          inReview = col1.taskIds;
          break;
        case 4:
          done = col1.taskIds;
          break;
        default:
          break;
      }

      if (col2) {
        switch (col2.id) {
          case 1:
            toDo = col2.taskIds;
            break;
          case 2:
            inProgress = col2.taskIds;
            break;
          case 3:
            inReview = col2.taskIds;
            break;
          case 4:
            done = col2.taskIds;
            break;
          default:
            break;
        }
      }

      console.log('COLUMNS:', toDo, inProgress, inReview, done);

      if (typeof Number(req.params.id) !== 'number') {
        console.log('not id');
        next();
      } else {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
          console.log('not project');
          next();
        } else {
          const authorized = await project.hasUser(req.user);
          if (!authorized) {
            res.sendStatus(403);
          } else {
            await project.update({
              name,
              totalTime,
              toDo,
              inProgress,
              inReview,
              done
            });
          }
          res.json(project);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});
