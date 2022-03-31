const Sequelize = require('sequelize');

var sequelize = new Sequelize(
    'tarea1_topicos', //nombre de la base
    'postgres', //user
    'aaaaaa', //password
    {
      host: 'localhost',
      dialect: 'postgres',
      pool:{
        max: 6,
        min: 0,
        require: 30000,
        idle: 10000
      },
      logging: false
    }  
);


module.exports = sequelize;