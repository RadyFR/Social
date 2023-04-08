const {Sequelize} = require("sequelize");

const cone = new Sequelize("socialnetworld","root","root",{
    host: "localhost",
    port: 3306,
    dialect:"mysql"
});


module.exports = cone;
