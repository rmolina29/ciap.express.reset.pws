var express = require("express");
var router = express.Router();
var conexion = require("../database/conexion");
var moment = require("moment-timezone");
var insert_token = require("../services/token_insert");
var {validacion_token,estado_verificado} = require("../services/validacion_token_valido");
var enviar_correo = require("../services/enviar_correos");

router.get("/", function (req, res, next) {
  res.json({ Welcome: "Express" });
});

router.get("/validar_token", function (req, res, next) {
  var id = req.body.id;
  //servicio para validar que el token este activo y si no esta activo
  validacion_token(id, (error, token_validacion) => {
    if (error) {
      return res.json({ error: error });
    }
    const estado = token_validacion.usuario[0].estado;

    if (estado == 0) {
      return res.json({ token: "token expirado" });
    }
    estado_verificado(id,(error,respuesta)=>{
        return res.json(respuesta);
    })
  });
});

router.post("/olvidar_contrasena", function (req, res, next) {
  var id = req.body.id;
  var email = req.body.email;

  conexion.query(
    "SELECT * FROM `usuario` WHERE id = ?;",
    [id],
    (err, usuario) => {
      if (err) {
        return res.json({ error: err.message });
      }
      // aqui se valida que el usuario que hizo la solicitud de olvidar su contraseña exista
      if (usuario.length == 0) {
        return res.json({ problema: "usuario no encontrado" });
      }

      insert_token(id, (error, token_insert) => {
        if (error) {
          return res.json({ error: error });
        }

        var clave = token_insert.digitos;
        // enviar correo electronico con el email del usuario y el codigo de 4 digitos se inserte el token de
        enviar_correo(email, clave,(error,respuesta)=>{
          if(err){
          return res.json({ error: error });
          }
          return res.json( respuesta );
        });
      });
    }
  ); // cierra la conexion con la db
});

module.exports = router;
