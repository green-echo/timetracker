const router = require('express').Router();
const { User, Project } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userid/projects', async (req, res, next) => {
  try {
    const user = await User.findByPk(Number(req.params.userid));
    if (!user) {
      return next();
    }
    const projects = await user.getProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});
