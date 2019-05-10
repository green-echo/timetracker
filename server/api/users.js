const router = require('express').Router();
const { User, UserTicket } = require('../db/models');
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

router.get('/timesheet', async (req, res, next) => {
  try {
    const data = await UserTicket.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});
