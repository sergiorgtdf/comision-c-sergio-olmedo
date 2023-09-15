const Foros = require("../models/foros.models");
const controllerForos = {};

// GET ALL
controllerForos.gellAll = async (req, res) => {
    const foros = await Foros.findAll();
    res.render("foro", {title: "Foros", results: foros});
};


controllerForos.formCreate = (req, res) => {
    res.render("createForo", { title: "Nuevo Foro" });
  };


//PARA CREAR AL USUARIO
controllerForos.postForo = async (req, res) => {
  const { author, title, description , content, image  } = req.body;

  //validacion para los datos del body
  if (!title || !description || !content) {

  
    return res.status(400).send({
      message: "Debe completar Titulo, Descripción y Contenido",
    });
  }

  //Guarda los datos que vienen del body en la const
  try {
    const foro = {
      author:author,
      title: title,
      description: description,
      content: content,
      image: image
      
    };
    // console.log(foro);
    if (!foro) {
      return res
        .status(409)
        .send({ message: "El contenido se encuentra en la base de datos" });
    } else {
      const newForo = await  Foros.create(foro);
      
      return res.redirect("/foro");
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};



//TODO: PUT PAGINA PARA EDITAR FORO
controllerForos.formEditForo = async (req, res) => {
  const { id } = req.params;
  

  const foro = await Foros.findOne({ where: { id: id } });
  
  
  res.render("editForo", {
    title: "Editar Foro",
    foros: foro,
  });

};

controllerForos.putForo = async (req, res) => {
  const { id, author, title, description , content, image  } = req.body;
  //validación de que no mande el dato del nombre para actualizar

  //validacion para los datos del body
  if (!title || !description || !content) {

  
    return res.status(400).send({
      message: "Debe completar Titulo, Descripción y Contenido",
    });
  }

  try {

    const updateForo = Foros.update(
      {
        author:author,
      title: title,
      description: description,
      content: content,
      image: image
      },
    
      { where: { id: id } }
    );
    return res.redirect("/foro");
    res.send({ message: "El foro Se edito con exito" });  
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }

  
};


controllerForos.deleteForo = (req, res) => {
  const { id } = req.params;
  const deleteUser = Foros.destroy({ where: { id: id } });
  //validacion para saber si ya existe o no en la bd
  if (deleteUser) {
    return res.redirect("/foro");
    // res
    //   .status(200)
    //   .send({ message: "Usuario eliminado de la base de datos" });
  } else {
    // return res
    //   .status(400)
    //   .send({ message: "Usuario no existe en la base de datos" })
  }
};

module.exports = { controllerForos };