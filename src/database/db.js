const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT;
const port = process.env.PORT || 5000;

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  dialect: dbDialect,
});

async function TestConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    console.log("Conexión a la base de datos establecida.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos, Error:", error);
  }
}

module.exports = { TestConnection, port, sequelize };