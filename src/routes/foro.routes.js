const foroRoutes = require("express").Router();
const { controllerForos } = require("../controllers/foro.controller");
const Foro = require("../models/foros.models");

//ruta GET INDEX
//userRoutes.get("/user", controllerUsers.indexUsers);

//ruta GET ALL 
foroRoutes.get("/foro", controllerForos.gellAll);

//ruta GET USER BY ID
// userRoutes.get("/user/:id", controllerUsers.getUserById);

//ruta POST (crear usuario)
foroRoutes.get("/createForo", controllerForos.formCreate);
foroRoutes.post("/saveForo", controllerForos.postForo);

//ruta PUT (actualizar al usuario)
foroRoutes.get("/editForo/:id", controllerForos.formEditForo);
foroRoutes.post("/updateForo", controllerForos.putForo);

//ruta DELETE (eliminar)
// userRoutes.get("/deleteForo/:id", controllerForos.delete);

module.exports = foroRoutes;
