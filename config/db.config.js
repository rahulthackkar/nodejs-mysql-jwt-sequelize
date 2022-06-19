// module.exports = {
//   HOST: process.env.MYSQL_HOST,
//   USER: process.env.MYSQL_USER,
//   DB: process.env.MYSQL_DATABASE,
//   PASSWORD: process.env.MYSQL_PASSWORD,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

const fs = require("fs");
require("dotenv").config();
module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: "json",
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
      //   ssl: {
      //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      //   }
    },
  },
};
