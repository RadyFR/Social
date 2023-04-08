const {Sequelize} = require("sequelize");

const cone = new Sequelize("socialnetworld","root","1234",{
    host: "localhost",
    port: 3306,
    dialect:"mysql"
});


module.exports = cone;
