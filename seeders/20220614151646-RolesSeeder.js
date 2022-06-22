"use strict";

module.exports = {
  async up(queryInterface) {
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

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("roles", null, {});
  },
};
