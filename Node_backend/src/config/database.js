//estableciendo conexion con la base de datos
const postgres = require('../database/postgres.db');


exports.connect = function() {
  postgres.authenticate().then(() => {
      console.log("Connection has been established successfully.");
  }).catch(err => {
      console.error("Unable to connect to the database:", err);
  });
};


