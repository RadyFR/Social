const {Sequelize} = require("sequelize");
const cone = require("../DB/Coneccion");


const usuarios = cone.define("usuarios", {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull:false
        
    },
    Nombre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Apellido:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Telefono:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    FotoPerfil:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        indexes:[{unique:true}]
        
    },
    NombreUsuario:{
        type:Sequelize.STRING,
        allowNull:false,
        indexes:[{unique:true}]
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Status:{
        type: Sequelize.BOOLEAN,
        allowNull:false
    }

});

module.exports = usuarios;



