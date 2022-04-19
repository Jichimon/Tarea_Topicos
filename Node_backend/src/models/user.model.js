const db = require('../database/postgres.db');
const Sequelize = require('sequelize');

const User = db.define(
    'User', 
    {
        //atributos
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataTypes.STRING
        },
        phone: {
            type: Sequelize.DataTypes.STRING
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                is: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/
            }        
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }
);

module.exports = User;