const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const serial = require('./public/js/serial');
const conexion = require('./public/js/db');

const lectura_Sen = 'SELECT * FROM `sensor` WHERE `id_sensor` = 1';
const escritura_VentAct='UPDATE `ventilador` SET `Activo` = '+1+' WHERE `ventilador`.`id_ventilador` = 1;';
const escritura_VentDesa='UPDATE `ventilador` SET `Activo` = '+0+' WHERE `ventilador`.`id_ventilador` = 1;';

const escritura_SenAct = 'UPDATE `sensor` SET `Lectura` = '+temp+',  `Activo` = '+1+'  WHERE `sensor`.`id_sensor` = 1';
const escritura_SenDesa = 'UPDATE `sensor` SET `Lectura` = '+temp+', `Activo` = '+0+'  WHERE `sensor`.`id_sensor` = 1';


// Enviar cadena
var sendON = '0';
var lectura_Servidor='0';

var temp = 0 ;

app.use(express.static(__dirname+'/public'));



io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});



function writeport()
{
  serial.write(sendON, function (err) {
    if (err) {
        return console.log('Error on write: ', err.message);
    }
    console.log('send: ' + sendON);
    io.emit('temp', sendON.toString());

});



conexion.query('SELECT * FROM `sensor` WHERE `id_sensor` = 1', function(error, results, fields){
  if(error)
  {throw error;}
  results.forEach(result=>{
      if(result.id_sensor==1){
    console.log(result.Lectura);
    lectura_Servidor = result.Lectura.toString();
      }
  });
});

if(lectura_Servidor>20)
{
  conexion.query('UPDATE `ventilador` SET `Activo` = '+1+' WHERE `ventilador`.`id_ventilador` = 1;', function(error, results, fields){
    if(error)
    {throw error;}
    else{
        console.log("Alta exitosa");
    }
});
}
else
{
  conexion.query('UPDATE `ventilador` SET `Activo` = '+0+' WHERE `ventilador`.`id_ventilador` = 1;', function(error, results, fields){
    if(error)
    {throw error;}
    else{
        console.log("Alta exitosa");
    }
});  }


conexion.query('SELECT * FROM `ventilador` WHERE `id_ventilador` = 1', function(error, results, fields){
  if(error)
  {throw error;}
  results.forEach(result=>{
      if(result.id_ventilador==1){
    console.log(result.Activo);
    sendON = result.Activo.toString();
      }
  });
});

}


serial.on('open', function () {
  writeport();
});

  
setInterval(function () {
  writeport();
}, 5000);

serial.on('data', function(data){
  temp = parseInt(data,10);
  
         // Recibir cadena
         if(data!=null)
         {
          console.log('recv: ' + data);
          lectura_Servidor = data;
          if(data>20){
           // sube_Sen(escritura_SenAct);
           conexion.query('UPDATE `sensor` SET `Lectura` = '+temp+',  `Activo` = '+1+'  WHERE `sensor`.`id_sensor` = 1', function(error, results, fields){
            if(error)
            {throw error;}
            else{
                console.log("Alta exitosa");
            }
        });
        
           }
          else
           {
            conexion.query('UPDATE `sensor` SET `Lectura` = '+temp+', `Activo` = '+0+'  WHERE `sensor`.`id_sensor` = 1', function(error, results, fields){
              if(error)
              {throw error;}
              else{
                  console.log("Alta exitosa");
              }
          });
          }
          
           // enviar cadena
           conexion.query('SELECT * FROM `sensor` WHERE `id_sensor` = 1', function(error, results, fields){
            if(error)
            {throw error;}
            results.forEach(result=>{
                if(result.id_sensor==1){
              console.log(result.Lectura);
              lectura_Servidor = result.Lectura.toString();
                }
            });
        });
         // enviar cadena
         io.emit('temp', data.toString());
         }

         else
{
  conexion.query('SELECT * FROM `sensor` WHERE `id_sensor` = 1', function(error, results, fields){
    if(error)
    {throw error;}
    results.forEach(result=>{
        if(result.id_sensor==1){
      console.log(result.Lectura);
      lectura_Servidor = result.Lectura.toString();
        }
    });
});

  if(lectura_Servidor>20)
  {
    conexion.query('UPDATE `ventilador` SET `Activo` = '+1+' WHERE `ventilador`.`id_ventilador` = 1;', function(error, results, fields){
      if(error)
      {throw error;}
      else{
          console.log("Alta exitosa");
      }
  });
  }
  else
  {
    conexion.query('UPDATE `ventilador` SET `Activo` = '+0+' WHERE `ventilador`.`id_ventilador` = 1;', function(error, results, fields){
      if(error)
      {throw error;}
      else{
          console.log("Alta exitosa");
      }
  });  }

  conexion.query('SELECT * FROM `ventilador` WHERE `id_ventilador` = 1', function(error, results, fields){
    if(error)
    {throw error;}
    results.forEach(result=>{
        if(result.id_sensor==1){
      console.log(result.Activo);
      sendON = result.Activo.toString();
        }
    });
});

}

});
function leer()
{

}
/*
serial.on('data', function (data) {
   temp = parseInt(data, 10);
   console.log(data);
if(temp>0 )
{
       // Recibir cadena
       console.log('recv: ' + data);
       
       if(temp>20){
        sube_Sen(escritura_SenAct);
       }
       else
       {
         sube_Sen(escritura_SenDesa);
       }

       // enviar cadena
       leer_Sen(lectura_Sen);
       io.emit('temp', lectura_Servidor.toString());
}
else
{
  leer_Sen(lectura_Sen);

  if(lectura_Servidor>20)
  {
    sube_Sen(escritura_VentAct);
  }
  else
  {
    sube_Sen(escritura_VentDesa);
  }
}

});*/




  


function sube_Sen(escritura){
        
  conexion.query(escritura, function(error, results, fields){
    if(error)
    {throw error;}
    else{
        console.log("Alta exitosa");
    }
});

    }

    
    function leer_Sen(lectura){

      conexion.query(lectura, function(error, results, fields){
          if(error)
          {throw error;}
          results.forEach(result=>{
              if(result.id_sensor==1){
            console.log(result);
            lectura_Servidor = result.lectura;
              }
          });
      });
      
  }

