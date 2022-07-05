const router = require('express').Router();

// Match routes
// router.use('/users', require('./users'));


router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
