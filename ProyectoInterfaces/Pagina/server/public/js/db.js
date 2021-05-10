
  
const mysql = require('mysql');


const conexion= mysql.createConnection({
    host: 'localhost',
    database: 'sensores',
    user: 'root',
    password: '',
  });
  
  conexion.connect(function(error){
  
    if(error)
    {
        throw error;
    }else{
        console.log('CONEXION EXITOSA BD');
    }
    });



module.exports = conexion;