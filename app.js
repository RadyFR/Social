const express = require("express");
const {engine} = require("express-handlebars")
const { v4:uuidv4 } = require("uuid")
const multer = require("multer")
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
    saveUninitialized: false,

}));

const uploadImage = multer.diskStorage({
    destination: function(req,file,cb){
        cb( null, "image")
    },
    filename: function(req,file,cb){
        const idImage = uuidv4();
        cb(null,`${idImage}-${file.originalname}`)
    }
})

app.use(multer({
    storage: uploadImage
}).single("photo"))

app.use((req,res,next) => {
    res.locals.isAutheticate =  req.session.loggedIn;
    next();
});

app.use(Login)
app.use(notfound)


cone.sync().then(result =>{
    app.listen(3000)
}).catch(err =>{
    console.log(err);
})
