var conexion = require("../database/conexion");
var moment = require("moment-timezone");

function insert_token(id, callback) {
    
  var digitosAleatorios = Math.floor(Math.random() * 9000) + 1000;
  var fechaActualUTC = moment().utc();
  var fechaActualColombia = fechaActualUTC.tz("America/Bogota");
  var fechaExpiracion = moment(fechaActualColombia).add(15, "minutes");
  var fechaExpiracionFormateada = fechaExpiracion.format("YYYY-MM-DD HH:mm:ss");

  conexion.query(
    "INSERT into token (id_usuario,clave,fecha_expiracion) VALUES (?,?,?)",
    [id, digitosAleatorios, fechaExpiracionFormateada],
    (err) => {
      if (err) {
        callback(err.message, null);
      } else {
        callback(null, {
          id: id,
          digitos: digitosAleatorios,
          fecha_expiracion: fechaExpiracionFormateada,
        });
      }
    }
  );
}

module.exports = insert_token;