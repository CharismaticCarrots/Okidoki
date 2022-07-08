const router = require('express').Router();
const { User } = require('../db');
const { requireToken } = require('./middleware.js');

module.exports = router;

// GET /user
router.get('/', requireToken, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

router.put('/', requireToken, async (req, res, next) => {
  try {
    const updatedUser = await req.user.update(req.body);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});
