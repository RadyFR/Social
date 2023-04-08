const express = require("express");
const {engine} = require("express-handlebars")
const path = require("path");
const notfound = require("./Routes/404NotFound")
const Login = require("./Routes/Login")

const app = express();

app.engine("hbs",engine({layoutsDir:"./views/layouts/", defaultLayout:"main-layouts",extname:"hbs"}));
app.set("view engine", "hbs");
app.set("views", "views")


app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use("/image",express.static(path.join(__dirname,"image")));

app.use(Login)
app.use(notfound)


app.listen(3000)