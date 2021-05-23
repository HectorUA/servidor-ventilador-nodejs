
  
const mysql = require('mysql');


const conexion= mysql.createConnection({
    host: 'database-sens.cfntfgj6z0el.sa-east-1.rds.amazonaws.com',
    database: 'sensores',
    user: 'root',
    password: 'root1234',
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