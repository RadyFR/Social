const email = require("nodemailer");

const trasporter = email.createTransport({
    service:"gmail",
    port:587,
    secure:false,
    auth:{
        user:"radyrolandofranco23@gmail.com",
        pass:"mzwtzqpbggfuzgaw"
    },
    tls:{
        rejectUnauthorized:false
    }
});


module.exports = trasporter;