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
    const userStepGoal = await req.user.update({
      dailyStepGoal: req.body.stepGoal,
    });
    res.json(userStepGoal);
  } catch (err) {
    next(err);
  }
});
