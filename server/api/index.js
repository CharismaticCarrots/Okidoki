const router = require('express').Router();

router.use('/dokis', require('./dokis'));
router.use('/user', require('./user'));
router.use('/items', require('./items'));

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
