const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { STRING, VIRTUAL, INTEGER, DATE, ENUM } = Sequelize;

const User = db.define('user', {
  email: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    validate: {
      customValidator() {
        if (this.externalType === 'postgres' && this.password === null) {
          throw new Error('Password cannot be blank');
        }
      },
    },
  },
  token: {
    type: VIRTUAL,
    get() {
      const token = jwt.sign({ userId: this.id }, process.env.JWT);
      return token;
    },
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  carrotCount: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  lastCarrotsClaimedAt: {
    type: DATE,
    defaultValue: new Date(),
  },
  dailyStepGoal: {
    type: INTEGER,
    defaultValue: 1000,
    validate: {
      min: 1000,
    },
  },
  externalType: {
    type: ENUM('google', 'facebook', 'postgres'),
  },
});

User.byToken = async (token) => {
  try {
    const parsedToken = jwt.verify(token, process.env.JWT);
    if (parsedToken) {
      const user = await User.findByPk(parsedToken.userId);
      return user;
    }
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw err;
  }
};

User.authenticate = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    if (user.externalType === 'google') {
      return user;
    }
    if (user.password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
  }
  const error = Error('bad credentials');
  error.status = 401;
  throw error;
};

User.prototype.toJSON = function () {
  return {
    token: this.token,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    carrotCount: this.carrotCount,
    dailyStepGoal: this.dailyStepGoal,
    lastCarrotsClaimedAt: this.lastCarrotsClaimedAt,
    externalType: this.externalType,
  };
};

User.beforeCreate(async (user) => {
  if (user.password) {
    const SALT_COUNT = 5;
    const hashedPw = await bcrypt.hash(user.password, SALT_COUNT);
    user.password = hashedPw;
  }
});

module.exports = User;
