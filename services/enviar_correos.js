const nodemailer = require("nodemailer");

let createTransport = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: "587",
  secure: false,
  auth: {
    type: "login",
    user: "no-reply@ises.com.co",
    pass: "SigIses2017",
  },
});

function enviar_correo(email, clave, callback) {
  let body = {
    from: "no-reply@ises.com.co", //remitente
    to: email, //destinatario
    subject: "Nuevo mensaje de usuario", //asunto del correo
    html: ` 
            <div> 
            <p>Hola amigo</p> 
            <p>clave: ${clave}</p> 
            <p>¿Cómo enviar correos eletrónicos con Nodemailer en NodeJS </p> 
            </div> 
        `,
  };

  createTransport.sendMail(body, function (error, info) {
    if (error) {
      callback(error.message, null);
    } else {
      callback(null, { estado: 1 });
    }
    createTransport.close();
  });
}

module.exports = enviar_correo;
