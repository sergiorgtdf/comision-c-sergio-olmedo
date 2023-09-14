const Foros = require("../models/foros.models");
const controllerForos = {};

// GET ALL
controllerForos.gellAll = async (req, res) => {
    const foros = await Foros.findAll();
    res.render("foro", {titleForo: "Foros", results: foros});
};

controllerForos.formCreate = (req, res) => {
    res.render("createForo", { titleCreateUser: "Nuevo Foro" });
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
  //manejamos el error con trycatch
  try {
    const foro = {
      author:author,
      title: title,
      description: description,
      content: content,
      image: image
      
    };
    console.log(foro);
    if (!foro) {
      return res
        .status(409)
        .send({ message: "El contenido se encuentra en la base de datos" });
    } else {
      const newForo = await  Foros.create(foro);
      return res.redirect("/foro");
      //res.send({ message: "Usuario creado con exito" });
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
    titleEditForo: "Editar Foro",
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


module.exports = { controllerForos };