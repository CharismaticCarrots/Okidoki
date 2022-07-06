const { db, Doki, User } = require('../server/db/');

const dokis = [
  {
    type: 'cat',
    spriteSheet: {
      idle: '../../assets/catSprites/cat.png'
    }
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
    password: 'password',
    firstName: 'Con',
    lastName: 'Man',
  },
  {
    email: 'bye@gmail.com',
    password: 'password',
    firstName: 'Angel',
    lastName: 'Y',
  },
  {
    email: 'hey@gmail.com',
    password: 'password',
    firstName: 'Kris',
    lastName: 'Tin',
  },
  {
    email: 'test@gmail.com',
    password: 'password',
    firstName: 'Ly',
    lastName: 'Diaaa',
  },
]



const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      dokis.map((doki) => {
        return Doki.create(doki);
      })
    );
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    const Doki1 = await Doki.findByPk(1)
    await Doki1.addUser(1, {through: {dokiName: 'Conbot'}})
    await Doki1.addUser(2, {through: {dokiName: 'Snow Angel'}})
    await Doki1.addUser(3, {through: {dokiName: 'Kris Kross'}})
    await Doki1.addUser(4, {through: {dokiName: 'Ldyster'}})
  } catch (error) {
    console.log(error);
  }
};

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
