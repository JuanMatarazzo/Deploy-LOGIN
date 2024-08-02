const { Sequelize } = require("sequelize");

const DB_USER = "postgres";
const DB_PASSWORD = "Juampa777";
const DB_HOST = "localhost:5432";

const database = new Sequelize(
    
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/demoLogin`,{logging: false}
  
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
const UserModel = require("./models/User.js")

UserModel(database)

module.exports = {database, ...database.models}