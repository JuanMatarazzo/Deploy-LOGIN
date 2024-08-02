const app = require("./src/app");
const { database } = require("./src/db");
require('dotenv').config()
const {PORT} = process.env

database.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Escuchando en el`, PORT);
  });
})
.catch((err) => console.log(err.menssage))