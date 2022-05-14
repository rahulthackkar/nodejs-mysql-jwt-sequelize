module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      },
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      },
    },
  });
  return User;
};
