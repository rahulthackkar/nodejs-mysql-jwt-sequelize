"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          name: "Administrator",
          email: "admin@radixweb.com",
          password: bcrypt.hashSync("password", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "rahul",
          name: "Rahul",
          email: "rahul.radixweb@gmail.com",
          password: bcrypt.hashSync("password", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const users = await queryInterface.sequelize.query(
      "SELECT id from users where username='rahul';"
    );
    const admins = await queryInterface.sequelize.query(
      "SELECT id from users where username='admin';"
    );
    const userRoles = await queryInterface.sequelize.query(
      "SELECT id from roles where name='user';"
    );
    const adminRoles = await queryInterface.sequelize.query(
      "SELECT id from roles where name='admin';"
    );

    const normalUser = users[0][0];
    const adminUser = admins[0][0];
    const userRole = userRoles[0][0];
    const adminRole = adminRoles[0][0];

    const data = [
      {
        roleId: userRole.id,
        userId: normalUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: adminRole.id,
        userId: adminUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return await queryInterface.bulkInsert("user_roles", data, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};
