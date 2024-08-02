const app = require("./src/app");
require('dotenv').config();
const { database } = require("./src/db");

const PORT = 3001;



database.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Escuchando en el ${PORT}`);
  });
})
.catch((err) => console.log(err.menssage))