const { Sequelize, DataTypes } = require('sequelize');
//Traer de la base de datos
const {sequelize} = require("../database/db");


//
const User = sequelize.define('User', {
  
  //El id lo genera automaticamente

  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  nombre:{
    type: DataTypes.STRING,
    allowNull: false
  },

  apellido:{
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true 
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  image: {
    type: DataTypes.STRING(500),
    allowNull: false
  }





}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
User.sync();

module.exports = User;