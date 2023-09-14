const { Sequelize, DataTypes } = require('sequelize');
//Traer de la base de datos
const {sequelize} = require("../database/db");


//
const Foro = sequelize.define('Foro', {
  
  //El id lo genera automaticamente

  author: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  title:{
    type: DataTypes.STRING,
    allowNull: false
  },

  description:{
    type: DataTypes.STRING,
    allowNull: false
  },

  content: {
    type: DataTypes.STRING(5000),
    allowNull: false 
  },
  
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  },

  visits: {
    type: DataTypes.INTEGER
  }


}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Foro === sequelize.models.Foro); // true
Foro.sync();

module.exports = Foro;