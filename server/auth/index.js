const router = require('express').Router();
const { User } = require('../db');

module.exports = router;

// POST /auth/signin
router.post('/signin', async (req, res, next) => {
  try {
    if (req.body.externalType === 'postgres') {
      const user = await User.authenticate(req.body);
      res.json(user);
    } else if (req.body.externalType === 'google') {
      const user = await User.findOne({
        where: {
          email: req.body.email,
          externalType: req.body.externalType,
        },
      });
      res.json(user);
    }
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
