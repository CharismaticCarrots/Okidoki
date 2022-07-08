const router = require('express').Router();
const { User, Doki, User_Doki } = require('../db');
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

router.post('/', async (req, res, next) => {
  try {
    //const user = await User.findByToken... when token available
    const randomUser = await User.findByPk(1)
  
    const randomDoki = ["fox", "cat", "bunny"][Math.floor(Math.random() * 3)];
    const doki = await Doki.findOne(
      {where: {
        type: randomDoki
      }})
    await randomUser.addDoki(doki)
    let userDoki = await User_Doki.findOne(
      {
        where: {
          userId: randomUser.id,
          dokiId: doki.id
        }
      }
    )
    await userDoki.set({dokiName: req.body.dokiName})
    res.send(await userDoki.save())
  } catch (err) {
    next(err);
  }
})

router.get('/doki',async (req, res, next) => {
  try {
    const randomUser = await User.findByPk(2)
    let userDoki = await User_Doki.findOne(
      {where: {
          userId: randomUser.id
        }
      }
    )
    res.json(userDoki)
  } catch (err) {
    next(err);
  }
} )