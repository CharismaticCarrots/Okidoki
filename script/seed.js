const { db, Doki, User, Item } = require('../server/db/');
const sub = require('date-fns/sub');

const dokis = [
  {
    type: 'cat',
  },
  {
    type: 'whitefox',
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
    carrotCount: 100,
  },
  {
    email: 'bye@gmail.com',
    password: 't',
    firstName: 'Angel',
    lastName: 'Y',
    carrotCount: 100,
    dailyStepGoal: 5050,
  },
  {
    email: 'hey@gmail.com',
    password: 't',
    firstName: 'Kris',
    lastName: 'Tin',
    carrotCount: 100,
  },
  {
    email: 'test@gmail.com',
    password: 't',
    firstName: 'Ly',
    lastName: 'Diaaa',
    carrotCount: 100,
  },
];

const items = [
  { name: 'slime', price: 1 },
  { name: 'ball', price: 1 },
  { name: 'leaf', price: 1 },
  { name: 'video game', price: 2 },
  { name: 'plushie', price: 2 },
  { name: 'flute', price: 2 },
  { name: 'gold star', price: 3 },
  { name: 'wand', price: 3 },
  { name: 'tomato', price: 3 },
];

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

    const [
      slime,
      ball,
      leaf,
      videogame,
      plushie,
      flute,
      goldstar,
      wand,
      tomato,
    ] = await Promise.all(
      items.map((item) => {
        return Item.create(item);
      })
    );

    // slime.addUser(user1, {
    //   through: {
    //     quantity: 3,
    //   },
    // });

    // ball.addUser(user2, {
    //   through: {
    //     quantity: 2,
    //   },
    // });

    // leaf.addUser(user3, {
    //   through: {
    //     quantity: 2,
    //   },
    // });

    // videogame.addUser(user4, {
    //   through: {
    //     quantity: 3,
    //   },
    // });

    await catDoki.addUser(user1, {
      through: {
        dokiName: 'Conbot',
        eggColor: 'red',
        lastFedAt: new Date(),
      },
    });

    await catDoki.addUser(user2, {
      through: {
        dokiName: 'Snow Angel',
        eggColor: 'green',
        lastFedAt: sub(new Date(), { days: 2 }),
      },
    });

    await rabbitDoki.addUser(user3, {
      through: {
        dokiName: 'Kris Kross',
        eggColor: 'red',
        lastFedAt: sub(new Date(), { hours: 5 }),
      },
    });

    await foxDoki.addUser(user4, {
      through: {
        dokiName: 'Ldyster',
        eggColor: 'blue',
        lastFedAt: sub(new Date(), { hours: 1 }),
      },
    });
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
      console.log(`seeded ${items.length} items`);
      console.log('Seeding success!');
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
    });
}
