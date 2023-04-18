const express = require("express");
const route  = express.Router();
const LoginControll = require("../Controller/LoginController")

route.get("/",LoginControll.showLogin);
route.get("/Home",LoginControll.showHome)
route.post("/loggedIn", LoginControll.InSeccion)
route.post("/logOut",LoginControll.loggout)
route.post("/register-user", LoginControll.Register)


//forgot password
route.get("/forgot-password", LoginControll.Forgot)
route.post("/recorver-password", LoginControll.ForgotRecover)

//active user
route.get("/showActive-user",LoginControll.Active)
route.post("/Active-user",LoginControll.ActiveAcount)

module.exports = route;