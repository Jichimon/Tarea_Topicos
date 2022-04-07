const Sequelize = require('sequelize');

var sequelize = new Sequelize(
    'appweb_topicos', //nombre de la base
    'postgres', //user
    'pajitas98', //password
    {
      host: 'localhost',
      dialect: 'postgres',
      pool:{
        max: 6,
        min: 0,
        require: 30000,
        idle: 10000
      },
      define: {
        freezeTableName: true
      },
      logging: false
    },
);


module.exports = sequelize;