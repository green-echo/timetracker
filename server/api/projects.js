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
    const projectId = req.params.id;
    const singleProject = await Project.findOne({
      where: {
        id: Number(projectId)
      }
    });
    res.json(singleProject);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/tickets', async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const singleProject = await Project.findOne({
      where: {
        id: Number(projectId)
      },
      include: Ticket
    });
    res.json(singleProject);
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
    const newProject = await Project.create(req.body);
    const user = await User.findOne({
      where: { id: req.session.passport.user }
    });
    newProject.addUser(user);
    res.json(newProject);
  } catch (error) {
    next(error);
  }
});
