const express = require("express");
const {engine} = require("express-handlebars")
const path = require("path");
const session = require("express-session")
const notfound = require("./Routes/404NotFound")
const Login = require("./Routes/Login")
const cone = require("./DB/Coneccion")
const usuarios = require("./Model/LoginModel")
const app = express();

app.engine("hbs",engine({layoutsDir:"./views/layouts/", defaultLayout:"main-layouts",extname:"hbs"}));
app.set("view engine", "hbs");
app.set("views", "views")


app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use("/image",express.static(path.join(__dirname,"image")));
app.use(session({
    secret:"Login",
    resave: true,
    saveUninitialized: true,

}));

app.use((req,res,next) => {
    req.session.isAutheticate = req.session.loggedIn;
    next();
});

app.use(Login)
app.use(notfound)


cone.sync().then(result =>{
    app.listen(3000)
}).catch(err =>{
    console.log(err);
})
