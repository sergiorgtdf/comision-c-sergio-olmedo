const User = require("../models/users.models");
const controllerUsers = {};



  

// GET ALL
controllerUsers.getAllUsers = async (req, res) => {
  const users = await User.findAll();

  res.render("user", { title: "Usuarios", results: users });
};



//TODO: POST: PAGINA DE INICIO
controllerUsers.formCreateUser = (req, res) => {
  res.render("createUser", { title: "Nuevo Usuario" });
};


//PARA CREAR AL USUARIO
controllerUsers.postUser = async (req, res) => {
  const { username, nombre, apellido, email, password, role, image } = req.body;

  //validacion para los datos del body
  if (!username || !email || !password) {
    return res.status(400).send({
      message: "Por favor ingresar los datos del obligatorios del usuario",
    });
  }
  //manejamos el error con trycatch
  try {
    const user = {
      username: username,
      nombre: nombre,
      apellido: apellido,
      email: email,
      role: role,
      password: password,
      image: image
    };
    if (!user) {
      return res
        .status(409)
        .send({ message: "Usuario ya existe en la base de datos" });
    } else {
      const newUser = await User.create(user);
      return res.redirect("/user");
      //res.send({ message: "Usuario creado con exito" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//TODO: PUT PAGINA PARA EDITAR USUARIO
controllerUsers.formEditUser = async (req, res) => {
  const { id } = req.params;
  

  const user = await User.findOne({ where: { id: id } });
  // console.log(user);
  
  res.render("editUser", {
    titleEditUser: "Editar Usuarios",
    user: user,
  });

};

controllerUsers.putUser = async (req, res) => {
  const { id, username, nombre, apellido, email, password, role, image } = req.body;
  //validación de que no mande el dato del nombre para actualizar

  if (!username || !email || !password) {
    return res.status(400).send({
      message: "Por favor ingresar los datos del obligatorios del usuario",
    });
  }

  try {

    const updateUser = User.update(
      {
        username: username,
        nombre: nombre,
        apellido: apellido,
        email: email,
        role: role,
        password: password,
        image: image
      },
    
      { where: { id: id } }
    );
    return res.redirect("/user");
    res.send({ message: "Usuario editado con exito" });  
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }

  
};

//TODO:DELETE

controllerUsers.deleteUser = (req, res) => {
  const { id } = req.params;
  const deleteUser = User.destroy({ where: { id: id } });
  //validacion para saber si ya existe o no en la bd
  if (deleteUser) {
    return res.redirect("/user");
    // res
    //   .status(200)
    //   .send({ message: "Usuario eliminado de la base de datos" });
  } else {
    // return res
    //   .status(400)
    //   .send({ message: "Usuario no existe en la base de datos" })
  }
};

module.exports = { controllerUsers };
