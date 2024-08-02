const {
  getUsers,
  getActualizar,
  deletUser,
  getLogin,
  getUserById,
} = require("../controllers/UsersControllers");
const { Router } = require("express");
const usersRouter = Router();

// RUTA DE ALL USERS
usersRouter.get("/", async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

// User Id
usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await getUserById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});


//RUTA DE ACTUALIZAR USER
usersRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, password, image, age } = req.body;
    const userActu = await getActualizar(
      id,
      name,
      email,
      gender,
      password,
      image,
      age
    );
    res.status(200).json(userActu);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// RUTA DE DELETE
usersRouter.delete("/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deletUser(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
