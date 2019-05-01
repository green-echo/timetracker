const router = require('express').Router();
const { Project, Ticket } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
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
