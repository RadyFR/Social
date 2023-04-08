const {Sequelize} = require("sequelize");
const cone = require("../DB/Coneccion");


const usuarios = cone.define("usuarios", {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull:false
        
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }

});

module.exports = usuarios;



