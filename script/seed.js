const { db, Doki} = require('../server/db/')

const dokis = [
    {
        type: 'cat',
    },
    {
        type: 'bunny'
    },
    {
        type: 'fox'
    }
]

const seed = async () => {
    try {
        await db.sync({ force: true });
        await Promise.all(dokis.map(doki => {
         return Doki.create(doki)
    }))
    } catch (error) {
        next(error)
    }
}

module.exports = seed;

if (require.main === module) {
    seed()
      .then(() => {
        console.log('Seeding success!');
      })
      .catch((err) => {
        console.error('Oh noes! Something went wrong!');
        console.error(err);
      });
  }