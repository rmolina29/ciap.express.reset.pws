var conexion = require("../database/conexion");


function validacion_token(id, callback) {
    
  conexion.query(
    `
    SELECT t.id,t.estado
    FROM token t
    WHERE id_usuario = ?
    ORDER BY estado DESC LIMIT 1;
        `,

    [id],
    (err, usuario) => {
      if (err) {
        callback(err.message, null);
      } else {
        callback(null, {
          id: id,
          usuario,
        });
      }
    }
  );
}

function estado_verificado(id, callback) {
  conexion.query(
    "UPDATE token SET estado = 3 WHERE id_usuario = ? ORDER BY id DESC LIMIT 1",
    [id],
    (err) => {
      if (err) {
        callback(err.message, null);
      } else {
        callback(null, {
          id: id,
          estado:'actualizado',
          token:'ok'
        });
      }
    }
  );
}



module.exports = {validacion_token,estado_verificado};
