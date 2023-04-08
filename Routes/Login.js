const express = require("express");
const route  = express.Router();
const LoginControll = require("../Controller/LoginController")

route.get("/",LoginControll.showLogin);
route.post("/loggedIn", LoginControll.InSeccion)
route.post("/register-user", LoginControll.Register)

module.exports = route;