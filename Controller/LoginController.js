const LoginModel = require("../Model/LoginModel");

exports.showLogin = (req,res,next) =>{
    res.render("login/Login",{tittle:"Inicio de seccion"})
}

exports.InSeccion = (req, res, next) =>{
    // res.setHeader("Set-Cookie", "loggedIn=true; expires=" +new Date(new Date.getTime() + 86409000).toString());
    const email = req.body.email;
    const pass = req.body.pass;

    LoginModel.findOne({where:{email:email,password:pass}}).then(result =>{
        req.session.loggedIn = true;
        const user = result.dataValues;
        res.render("SocialNetwork/Home",{tittle:"RedSocial", infoUser:user})
    }).catch(err =>{
        if (err){
            console.log("Usuario y/o contraseña incorrectas");
            res.redirect("/")
        }
    })

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