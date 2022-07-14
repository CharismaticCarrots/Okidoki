const router = require('express').Router();
const { User } = require('../db');

module.exports = router;

// POST /auth/signin
router.post('/signin', async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);
    res.json(user);
  } catch (err) {
    res.send('Invalid username or password');
  }
});

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, externalType } = req.body;

    const newUser = await User.create({
      email,
      password: password || '',
      firstName,
      lastName,
      externalType,
    });

    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('That email address is already in use.');
    } else {
      next(err);
    }
  }
});
