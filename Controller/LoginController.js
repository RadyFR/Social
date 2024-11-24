const LoginModel = require("../Model/LoginModel");
const bscrypt = require("bcryptjs")
const mail = require("../service/mail");
const e = require("express");

exports.showLogin = (req,res,next) =>{
    const errUser = req.session.messageFound;
    delete req.session.messageFound;
    res.render("login/Login",{tittle:"Inicio de seccion", errRegister:errUser})
}

exports.showHome = (req, res, next) =>{
    res.render("SocialNetwork/Home"),{tittle:"Home Page"}
}

exports.InSeccion = (req, res, next) =>{
    const usuario = req.body.email;
    const pass = req.body.pass;

    LoginModel.findOne({where:{NombreUsuario:usuario}}).then(result =>{
        const contraseña = result.dataValues.password;
        const status = result.dataValues.Status;

        if (status){
            bscrypt.compare(pass,contraseña).then(truepass =>{
                if (truepass){
                    req.session.loggedIn = true;
                    res.redirect("/Home")
                }else{
                    console.log("Usuario y/o contraseña incorrectas");
                    res.redirect("/")
                }
            })
        }else{
            const codeActive = Math.floor(Math.random()*(10000-1+1)+1)
            req.session.activeByLogin = codeActive;
            req.session.loginUser = result.dataValues.NombreUsuario;
            req.session.loginMail = result.dataValues.email;
            mail.sendMail({
                from:"radyrolandofranco23@gmail.com",
                to: result.dataValues.email,
                subject:"chico poya",
                html:`Su codigo para activar su cuenta es:${codeActive}`
            })
            res.redirect("/showActive-user")
        }
    }).catch(err =>{
        if (err){
            console.log("Usuario y/o contraseña incorrectas");
            res.redirect("/")
        }
    })

}

exports.loggout = (req, res,next) =>{
    req.session.destroy(err =>{
        console.log(err);
    })
    res.redirect("/")
}


exports.Register = (req, res, next) =>{
    const name = req.body.Name;
    const apelido = req.body.apellido;
    const tel = req.body.tel;
    const photo = req.file;
    const email = req.body.Email;
    const userName = req.body.userName;
    const pass = req.body.pass;
    const confipass = req.body.confirmationpass;

    LoginModel.findOne({where:{NombreUsuario:userName}}).then(userFound =>{
        if(userFound){
            req.session.messageFound = "Este usuario ya esta registrado"
            res.redirect("/")
        }else{
            if (pass === confipass){
                bscrypt.hash(pass, 12).then(resu =>{
                LoginModel.create({Nombre:name, Apellido:apelido,Telefono:tel,FotoPerfil:"/"+photo.path,email:email,NombreUsuario:userName,password:resu,Status:false}).then(result =>{
                    const codeActive = Math.floor(Math.random()*(10000-1+1)+1)
                    req.session.activeAccount =codeActive;
                    req.session.userName = userName;
                    req.session.userMail = email;
 
                    mail.sendMail({
                        from:"radyrolandofranco23@gmail.com",
                        to: email,
                        subject:"chico poya",
                        html:`Su codigo para activar su cuenta es:${codeActive}`
                    });
 
                    res.redirect("/showActive-user")
                 }).catch(err =>{
                    console.log(err);
                    res.redirect("/")
                 })
              }).catch(err =>{
                console.log(err);
              })
                
            }else{
                console.log("Oye bro eso tiene que ser igual, sabes que hablo de la contrase;a")
            }
        }

    }).catch(err =>{
        console.log(err);
    })


}

//forgot password
exports.Forgot = (req,res,next) =>{
    res.render("login/ForgotPassword", {tittle: "Olvide mi contraseña"})
} 


exports.ForgotRecover = (req, res,next)=>{
    const user = req.body.username;
    const pass = req.body.pass;

    LoginModel.findOne({where:{NombreUsuario:user}}).then(result => {
        const email = result.dataValues.email;
        
        if (!result){
            req.session.userMessage="Este usuario no existe"
            res.redirect("/")
        }

        LoginModel.update({password:pass},{where:{NombreUsuario:user}}).then(results =>{
            req.session.messagaSuccess ="Contraseña restablecida correctamente"
            mail.sendMail({
                from:"radyrolandofranco23@gmail.com",
                to: email,
                subject:"Contraseña restablecida correctamente",
                html:`Su nueva contraseña es:${pass}`
            })
            return res.redirect("/")
        }).catch(err =>{
            console.log(err);
        })
    })
}


//active user
exports.Active = (req,res,next) =>{
    res.render("login/ActiveUser", {tittle: "Activar usuario"})
}


exports.ActiveAcount = (req, res,next)=>{
    const code = req.body.codeActive;
    const activationCode = req.session.activeAccount || req.session.activeByLogin;
    const userName = req.session.userName ||  req.session.loginUser;
    const userMail = req.session.userMail  || req.session.loginMail;

    console.log(code, activationCode)

    if(code === activationCode.toString()){

        LoginModel.update({Status:true},{where:{NombreUsuario:userName}})
        mail.sendMail({
            from: "radyrolandofranco23@gmail.com",
            to:userMail,
            subject:"Congrats your activation was sucessful",
            html:`Welcon to the family ${userName}`
        });

        return res.redirect("/")
    }

}