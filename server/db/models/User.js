const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  token: {
    type: Sequelize.VIRTUAL,
    get() {
      const token = jwt.sign({ userId: this.id }, process.env.JWT);
      return token;
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  carrotCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  lastCarrotsClaimedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  dailyStepGoal: {
    type: Sequelize.INTEGER,
    defaultValue: 1000,
    validate: {
      min: 1000,
    },
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
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return user;
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
  };
};

User.beforeCreate(async (user) => {
  const SALT_COUNT = 5;
  const hashedPw = await bcrypt.hash(user.password, SALT_COUNT);
  user.password = hashedPw;
});

module.exports = User;
