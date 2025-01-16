const express = require('express');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { name, description, date } = req.body;
  const event = new Event({ name, description, date, createdBy: req.user.id });
  await event.save();
  res.status(201).json(event);
});

router.get('/', async (req, res) => {
  const events = await Event.find().populate('createdBy', 'name');
  res.json(events);
});

module.exports = router;
