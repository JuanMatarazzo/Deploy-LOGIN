const { User } = require("../db");
const { tokenSing } = require("../helpers/generateToken");
const { encrypt, compare } = require("../helpers/handleBcrypt");

// FILTRADOS...
//  FUNCION PARA BUSCAR UN USUARIO POR NOMBRE. (GET) --- que traiga los que van matcheando ...

// FUNCION PARA CREAR USUARIOS ---- (POST)
const createUser = async (name, email, gender, password, image, age) => {
  if (!name || !email || !gender || !password || !image || !age)
    throw Error("Faltan datos");
  let rename = name.toUpperCase();
  let user = await User.findOne({ where: { name: rename } });
  if (user) throw Error("El nombre ya existe");

  let imail = await User.findOne({ where: { email } });
  if (imail) throw Error("El email ya existe");

  try {
    const passwordHash = await encrypt(password);
    const newUser = await User.create({
      name,
      email,
      gender,
      password: passwordHash,
      image,
      age,
    });
    return newUser;
  } catch (error) {
    console.log({ error: error.message });
  }
};

// FUNCION PARA TRAER A TODOS LOS USUARIOS, TODOS AQUELLOS QUE NO TENGAN LA PROP ADMIN. (GET)
const getUsers = async () => {
  let users = await User.findAll();
  return users;
};

// FUNCION PARA ACTUALIZAR A NUESTRO USUARIO. (PUT)

const getActualizar = async (id, name, email, gender, password, image, age) => {
  let userName = await User.findOne({ where: { name: name.toUpperCase() } });
  let user = await User.findOne({ where: { id: id } });

  if (userName && userName.id !== id) {
    throw new Error("El nombre del usuario ya existe!");
  }
  if (!user) throw new Error("El usuario no existe");

  try {
    const passwordHash = await encrypt(password);

    await User.update(
      {
        name: name,
        email: email,
        gender: gender,
        password: passwordHash,
        image: image,
        age: age,
      },
      {
        where: { id: id },
      }
    );

    const userActualizado = await User.findOne({ where: { id: id } });
    return userActualizado;
  } catch (error) {
    console.log({ error: error.message });
    throw error; 
  }
};
// FUNCION PARA ELIMINAR UN USUARIO... (DELETE)

const deletUser = async (id) => {
  const userToDelete = await User.findByPk(id);
  if (!userToDelete) throw Error("El usuario no existe");
  try {
    if (userToDelete) {
      await userToDelete.destroy();
      return userToDelete;
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

// FUNCION PARA LOGEAR --- DEBEMOS VERIFICAR SI NUESTRO USUARIO EXISTE EN LA DB. (POST)

const getLogin = async (name, password) => {
  let rename = name.toUpperCase();
  let user = await User.findOne({ where: { name: rename } });

  if (!user) throw Error("Compruebe el usuario");
  const checkPassword = await compare(password, user.password);

  if (!checkPassword) throw Error("La contraseña es incorrecta!");

  const tokenSession = await tokenSing(user);
  try {
    if (user) {
      if (checkPassword) {
        return { data: user, tokenSession };
      }
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

//FUNCION DE USER POR ID
const getUserById = async (id) => {
  let user = await User.findByPk(id);
  if (!user) throw Error(`El user con id: ${id} no existe`);

  try {
    if (user) {
      return user;
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getActualizar,
  deletUser,
  getLogin,
  getUserById,
};
