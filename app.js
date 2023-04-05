const express = require("express");
const {engine} = require("express-handlebars")
const path = require("path");

const app = express();

app.set("hbs",engine());
app.set("view engine", "hbs");
app.set("views", "views")


app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));


app.listen(3000)