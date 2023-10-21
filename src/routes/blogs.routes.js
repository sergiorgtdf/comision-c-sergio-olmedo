const blogRoutes = require("express").Router();
const { controllerBlogs } = require("../controllers/blog.controller");
const Blog = require("../models/blogs.models");


//ruta GET Index

//OBTENER TODO LOS REGISTROS
//pagina, datos
blogRoutes.get("/blog", controllerBlogs.getAllRegister);

//Crear Registro
blogRoutes.get("/createBlog", controllerBlogs.formCreateBlog);
blogRoutes.post("/saveBlog", controllerBlogs.postRegister);

//Actualizar
blogRoutes.get("/editBlog/:id", controllerBlogs.formEdit);
blogRoutes.post("/updateBlog", controllerBlogs.putRegister);

//Eliminar
blogRoutes.get("/deleteBlog/:id", controllerBlogs.deleteRegister);

module.exports = blogRoutes;