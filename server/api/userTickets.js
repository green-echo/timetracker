const router = require('express').Router();
const { UserTicket } = require('../db/models');
module.exports = router;

// returns all usertickets for a specific userId
router.get('/:userId', async (req, res, next) => {});

// returns all usertickets for a specific ticketId
router.get('/:ticketId', async (req, res, next) => {});

router.put('/', async (req, res, next) => {
  const { end } = req.body;
});

router.post('/:ticketId', async (req, res, next) => {
  const { start, userId } = req.body;
});
