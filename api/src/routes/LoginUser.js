const { getLogin } = require("../controllers/UsersControllers");

const { Router } = require("express");
const loginUser = Router();

// RUTA DE LOGIN
loginUser.post("/", async (req, res) => {
    const { name, password } = req.body;
    try {
      const userLogin = await getLogin(name, password);
      res.status(200).json(userLogin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  module.exports = loginUser