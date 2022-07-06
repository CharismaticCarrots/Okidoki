const { db } = require('./db');
const app = require('./app');
const port = process.env.PORT || 19002;

db.sync().then(function () {
  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  });
});
