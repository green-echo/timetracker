const router = require('express').Router();
const { Project, Ticket, User } = require('../db/models');
module.exports = router;

router.get('/all', async (req, res, next) => {
  try {
    const allProjects = await Project.findAll();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByPk(Number(req.params.id));
    if (!project) {
      next();
    } else {
      res.json(project);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/tickets', async (req, res, next) => {
  try {
    const project = await Project.findByPk(Number(req.params.id));
    if (!project) {
      next();
    } else {
      const tickets = await project.getTickets();
      res.json(tickets);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/users', async (req, res, next) => {
  try {
    const project = Project.findByPk(Number(req.params.id));
    if (!project) {
      next();
    } else {
      const users = await project.getUsers();
      res.json(users);
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

router.get('/', async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findOne({
      where: { id: req.session.passport.user }
    });
    if (!user) {
      return next();
    }
    const projects = await user.getProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, totalTime } = req.body;
    const newProject = await Project.create({ name, totalTime });
    const user = await User.findOne({
      where: { id: req.session.passport.user }
    });
    newProject.addUser(user);
    res.json(newProject);
  } catch (error) {
    next(error);
  }
});
