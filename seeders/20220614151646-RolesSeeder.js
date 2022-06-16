"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert("roles", [
      {
        id: 1,
        name: "user",
      },
      {
        id: 2,
        name: "moderator",
      },
      {
        id: 3,
        name: "admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("roles", null, {});
  },
};
