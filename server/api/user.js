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

router.post('/doki', requireToken, async (req, res, next) => {
  try {
    const user = req.user
    const randomDoki = ["fox", "cat", "bunny"][Math.floor(Math.random() * 3)];
    const doki = await Doki.findOne(
      {where: {
        type: randomDoki
      }})
    await user.addDoki(doki, {through: {dokiName:req.body.dokiName}})
    res.send()
  } catch (err) {
    next(err);
  }
})

router.get('/doki', requireToken, async (req, res, next) => {
  try {
    const user = req.user
    let userDoki = await User_Doki.findOne(
      {where: {
          userId: user.id
        }
      }
    )
    res.json(userDoki)
  } catch (err) {
    next(err);
  }
} )