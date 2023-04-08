const LoginModel = require("../Model/LoginModel");

exports.showLogin = (req,res,next) =>{
    res.render("login/Login",{tittle:"Inicio de seccion"})
}

exports.InSeccion = (req, res, next) =>{
    res.setHeader("Set-Cookie", "loggedIn=true; expires=" +new Date(new Date.getTime() + 86409000).toString());

}


exports.Register = (req, res, next) =>{
    const name = req.body.Name;
    const email = req.body.Email;
    const pass = req.body.Password;

    LoginModel.create({Name:name, email:email,password:pass}).then(result =>{
        res.redirect("/")
    }).catch(err =>{
        console.log(err);
    })

}