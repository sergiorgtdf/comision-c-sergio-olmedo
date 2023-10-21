//inicializamos el servidor
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const ejs = require("ejs");
// const helmet = require("helmet");

const app = express();
const { TestConnection, port } = require("./database/db");

//Rutas
const indexRouter = require("./routes/index.routes");
const userRoutes = require("./routes/users.routes");
const blogRoutes = require("./routes/blogs.routes");




//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
//  app.use(helmet());


//motor de vistas de ejs
app.set("view engine", "ejs");

// Ruta de la carpeta estatica para los archivos css y js publicos

app.use(express.static(path.join(__dirname , "public")));
// console.log((path.join(__dirname , "public")));

// carpeta views para que encuentre dinamicamente
app.set("views", path.join(__dirname, "views"));

// console.log(__dirname, "views");
TestConnection();

// Para que use las rutas
app.use(indexRouter);
app.use(userRoutes);
app.use(blogRoutes);

let tituloPrograma = "Aplicación AP";

// Inicia Servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
