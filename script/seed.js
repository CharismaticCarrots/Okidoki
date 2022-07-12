const { db, Doki, User, Item } = require('../server/db/');
const sub = require('date-fns/sub');

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
    carrotCount: 80,
    dailyStepGoal: 5050,
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

const items = [
  { name: 'Ball', price: 5, imageUrl: 'assets/items/ball.png' },
  { name: 'Teddy bear', price: 5, imageUrl: 'assets/items/teddybear.png' },
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

    const [ball, teddyBear] = await Promise.all(
      items.map((item) => {
        return Item.create(item);
      })
    );

    ball.addUser(user1, {
      through: {
        quantity: 3,
      },
    });

    ball.addUser(user2, {
      through: {
        quantity: 2,
      },
    });

    teddyBear.addUser(user3, {
      through: {
        quantity: 2,
      },
    });

    teddyBear.addUser(user4, {
      through: {
        quantity: 3,
      },
    });

    await catDoki.addUser(user1, {
      through: {
        dokiName: 'Conbot',
        lastFedAt: new Date(),
      },
    });

    await catDoki.addUser(user2, {
      through: {
        dokiName: 'Snow Angel',
        lastFedAt: sub(new Date(), { days: 2 }),
      },
    });

    await rabbitDoki.addUser(user3, {
      through: {
        dokiName: 'Kris Kross',
        lastFedAt: sub(new Date(), { hours: 5 }),
      },
    });

    await foxDoki.addUser(user4, {
      through: {
        dokiName: 'Ldyster',
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
