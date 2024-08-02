const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
const database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false }
);
// async function  validate() {
//     try {
//         await database.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// validate()
const UserModel = require("./models/User.js");

UserModel(database);

module.exports = { database, ...database.models };
