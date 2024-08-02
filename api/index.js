const app = require("./src/app");
const { database } = require("./src/db");
require('dotenv').config()
const {PORT} = process.env
const port = process.env.PORT || 3001;

database.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`%s listening at`, port);
  });
})
.catch((err) => console.log(err.menssage))