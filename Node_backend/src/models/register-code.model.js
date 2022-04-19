const db = require('../database/postgres.db');
const Sequelize = require('sequelize');

const RegisterCode = db.define(
    'RegisterCode', 
    {
        //atributos
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: Sequelize.DataTypes.INTEGER
        },
        userId: {
            type: Sequelize.DataTypes.INTEGER
        }
    }
);

module.exports = RegisterCode;