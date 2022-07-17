const router = require('express').Router();
const { User } = require('../db');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLECLIENTID);

module.exports = router;

// POST /auth/signin
router.post('/signin', async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);
    res.json(user);
  } catch (err) {
    res.status(422).json({ message: 'Invalid username or password' });
  }
});

router.post('/googleauthroute', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.GOOGLECLIENTID,
    });
    const payload = ticket.getPayload();

    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
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
