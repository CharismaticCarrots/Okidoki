const { db, Doki, User } = require('../server/db/');

const dokis = [
  {
    type: 'cat',
    spriteSheet: {
      idle: '../../assets/catSprites/cat.png',
    },
  },
  {
    type: 'bunny',
  },
  {
    type: 'fox',
  },
];

const users = [
  {
    email: 'hello@gmail.com',
    password: 't',
    firstName: 'Con',
    lastName: 'Man',
  },
  {
    email: 'bye@gmail.com',
    password: 't',
    firstName: 'Angel',
    lastName: 'Y',
  },
  {
    email: 'hey@gmail.com',
    password: 't',
    firstName: 'Kris',
    lastName: 'Tin',
  },
  {
    email: 'test@gmail.com',
    password: 't',
    firstName: 'Ly',
    lastName: 'Diaaa',
  },
];

const curTime = new Date();
const oneHrAgo = new Date(curTime.getTime() - (1000*60*60));
const fiveHrsAgo = new Date(curTime.getTime() - (1000*60*60*5));

const seed = async () => {
  try {
    await db.sync({ force: true });
    const [catDoki, rabbitDoki, foxDoki] = await Promise.all(
      dokis.map((doki) => {
        return Doki.create(doki);
      })
    );
    const [user1, user2, user3, user4] = await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    await catDoki.addUser(user1, { through: {
      dokiName: 'Conbot',
      lastFedAt: curTime,
    }});

    await catDoki.addUser(user2, { through: {
      dokiName: 'Snow Angel',
      lastFedAt: oneHrAgo,
    }});

    await rabbitDoki.addUser(user3, { through: {
      dokiName: 'Kris Kross',
      lastFedAt: fiveHrsAgo,
    }});

    await foxDoki.addUser(user4, { through: {
      dokiName: 'Ldyster'
    }});

  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(`seeded ${users.length} users`);
      console.log(`seeded ${dokis.length} dokis`);
      console.log('Seeding success!');
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
    });
};
