const express = require("express");
const route  = express.Router();
const LoginControll = require("../Controller/LoginController")

route.get("/",LoginControll.showLogin);

module.exports = route;