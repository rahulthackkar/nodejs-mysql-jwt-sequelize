module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    googleId: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    source: {
      type: Sequelize.STRING,
    },
  });
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.roles, {
      through: "user_roles",
      foreignKey: "userId",
      otherKey: "roleId",
    });
  };
  return User;
};
