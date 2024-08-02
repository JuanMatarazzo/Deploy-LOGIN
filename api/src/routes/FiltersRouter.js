const { Router } = require("express");
const {getFilterOrSex, getFilterName} = require("../controllers/FiltersControllers")
const filterRouter = Router();


// RUTA DE filtrado por genero
filterRouter.get("/sex/:gender", async (req, res) => {
    const { gender } = req.params;
    if (gender !== 'male' && gender !== 'female') {
        return res.status(400).json({ error: 'Género no válido' });
      }
      try {
        const users = await getFilterOrSex(gender.toUpperCase())
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
  });

  filterRouter.get("/", async (req, res) => {
    const { order  } = req.query; 
    if (order !== 'asc' && order !== 'desc') {
        return res.status(400).json({ error: 'Orden no válido' });
      }
      try {
        const users = await getFilterName(order)
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
  });


  module.exports = filterRouter
  