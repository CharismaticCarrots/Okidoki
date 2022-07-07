const router = require('express').Router();
const { User } = require('../db');

module.exports = router;

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});
