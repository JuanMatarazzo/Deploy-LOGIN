const { Router } = require("express");
const {
    createUser
  } = require("../controllers/UsersControllers");
const creationUserRouter = Router();


// RUTA DE CREACION
creationUserRouter.post("/", async (req, res) => {
    try {
      const { name, email, gender, password, image, age } = req.body;
      const newUser = await createUser(name, email, gender, password, image, age);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });



  module.exports = creationUserRouter
  
  