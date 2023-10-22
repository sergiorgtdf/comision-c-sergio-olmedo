const Blog = require("../models/blogs.models");
const controllerBlogs = {};

// GET ALL
controllerBlogs.getAllRegister = async (req, res) => {
  //Obtiene todos los elementos
  const blogs = await Blog.findAll();

  res.render("blog", { title: "Blogs", results: blogs });
};

controllerBlogs.formCreateBlog = (req, res) => {
  res.render("createBlog", { title: "Nuevo Blog" });
};

// NUEVO
controllerBlogs.postRegister = async (req, res) => {
  const { author, title, description, content, image } = req.body;


  //Validacion
  if (!title || !description || !content) {
    return res.status(400).send({
      Messaje: "Completa los datos obligatorios",
    });
  }

  //Si se valido, Guarda los datos
  try {
    const blog = {
      author: author,
      title: title,
      description: description,
      content: content,
      image: image,
    };
    
    if (!blog) {
      return res.status.send(409)({ message: "El registro ya existe en la base de datos" });
    } else {
      const newBlog = await Blog.create(blog);
      console.log("Se guardo mel registro");
      return res.redirect("/blog");

    }
  } catch (error) {
    console.error(error);
    res.status(500).send(erro);
  }
};

//TODO: PUT PAGINA PARA EDITAR BLOG
controllerBlogs.formEdit = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findOne({ where: { id: id } });

  res.render("editBlog", { title: "Editar Blog", blog: blog });
};

//Actualizar
controllerBlogs.putRegister = async (req, res) => {
  const { id, author, title, description, content, image } = req.body;
  //validación de que no mande el dato del nombre para actualizar

  //validacion para los datos del body
  if (!title || !description || !content) {
    return res.status(400).send({
      message: "Debe completar con los campos obligatorios",
    });
  }

  try {
    const updateBlog = Blog.update(
      {
        author: author,
        title: title,
        description: description,
        content: content,
        image: image,
      },
      { where: { id: id } }
    );

    return res.redirect("/blog");
    res.send({message: "Registro actualizado"});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//TODO: DELETE

controllerBlogs.deleteRegister = (req, res) => {
    const {id} = req.params;
    const delete_reg = Blog.destroy({where: {id:id}});
    if (delete_reg){
        return res.redirect("/blog");
        //devolver mensaje que se elimino
    }else{
        return res.status(400).send({message: "El registro no exites en la Base de Datos"});

    }
};

module.exports = { controllerBlogs };
