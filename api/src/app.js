const express = require("express");
const usersRouter = require("./routes/UsersRouter");
const creationUserRouter = require("./routes/CreationRouter");
const loginUser = require("./routes/LoginUser");
const filterRouter = require("./routes/FiltersRouter")
const morgan = require("morgan");
const { checkAuth } = require("./middleware/auth");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", checkAuth, usersRouter);
app.use("/create", creationUserRouter);
app.use("/login", loginUser);
app.use("/filters", filterRouter)
module.exports = app;
