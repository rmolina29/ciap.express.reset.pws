const mysql = require('mysql')
require('dotenv').config()

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

conexion.connect((err)=>{
    if(err){
        console.error(err);
        return;
    }

    console.log('Se ha conectado');
})

module.exports = conexion;