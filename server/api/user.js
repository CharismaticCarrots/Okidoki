const router = require('express').Router();
const { User, Doki, User_Doki, User_Item, Item } = require('../db');
const { requireToken } = require('./middleware.js');

module.exports = router;

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

router.get('/doki', requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    const userDoki = await user.getDokis();
    res.json(userDoki[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/doki', requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    const randomDoki = ['fox', 'cat', 'bunny'][Math.floor(Math.random() * 3)];
    const doki = await Doki.findOne({
      where: {
        type: randomDoki,
      },
    });
    await user.addDoki(doki, { through: { dokiName: req.body.dokiName } });
    res.send();
  } catch (err) {
    next(err);
  }
});

router.put('/doki', requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    const userDoki = await User_Doki.findOne({
      where: {
        userId: user.id,
      },
    });
    await userDoki.set(req.body);
    res.send(await userDoki.save());
  } catch (err) {
    next(err);
  }
});

router.get('/items', requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    const items = await user.getItems()
    res.send(items)
  } catch (error) {
    next(error)
  }
})


router.put('/items/:id', requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    const item = await Item.findByPk(parseInt(req.params.id))
    if (await user.hasItem(item)){
      const userItem = await User_Item.findOne({
        where: {
          userId: user.id,
          itemId: item.id
        }
      })
      const newQuantity = userItem.quantity + req.body.quantity
      if (newQuantity > 0){
        await userItem.update({quantity: newQuantity})
        res.send(await userItem.save());
      }
      else if (newQuantity <= 0){
        user.removeItem(item)
        res.send()
      }
    }
    else {
      user.addItem(item, { through: { quantity: req.body.quantity } } )
      res.send()
    }
  } catch (error) {
    next(error)
  }
})