const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var sockData = [{
  vent_id:"0",
  send:"0",
  sens_id:"0",
  lectura:"0",
  regreso:"0"
}];





const serial = require('./public/js/serial');  //se agrega la incializacion previa que se hizo en el archivo serial.js
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



function writeport()  //funcion que escribe valores en el puerto serial
{
  serial.write(sendON, function (err) {  //se escribe el valor sendON en el puerto
    if (err) {   //se recibe si hay algun error
        return console.log('Error on write: ', err.message);
    }
    console.log('send: ' + sendON);  
    sockData[0].send=sendON;

    io.emit('sockData', sockData);  //se envia el valor al socket para mostrarse en la pagina 

});



conexion.query('SELECT * FROM `sensor` WHERE `id_sensor` = 1', function(error, results, fields){
  if(error)
  {throw error;}
  results.forEach(result=>{
      if(result.id_sensor==1){
    console.log(result.Lectura);
    lectura_Servidor = result.Lectura.toString();
    sockData[0].sens_id=result.id_sensor.toString();

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
    sockData[0].vent_id=result.id_ventilador.toString();

      }
  });
});

}

// Se abre el puerto para enviar datos
serial.on('open', function () {
  writeport();  //se llama ala funcion writeport();
});

  //se activa una interrupcion cada cierto tiempo para llamara al a funcion write port
setInterval(function () {  
  writeport();
}, 3000);

//Se verifica si el puerto esta prendido y recibe datos 
serial.on('data', function(data){
  temp = parseInt(data,10); //almacena el valor y lo convierte en entero ya que se se envian strings en el puerto
  
         // Recibir cadena
         if(data!=null)  //si se recibe valores del puerto serial
         {
          console.log('recv: ' + data);
           
           // sube_Sen(escritura_SenAct);
           //actualiza los valores en la base de datos
           conexion.query('UPDATE `sensor` SET `Lectura` = '+temp+',  `Activo` = '+1+'  WHERE `sensor`.`id_sensor` = 1', function(error, results, fields){
            if(error)
            {throw error;}
            else{
                console.log("Alta exitosa");
            }
        });
        
           
         
          
           // lee la lectura guardada en la base de datos 
           conexion.query('SELECT * FROM `sensor` WHERE `id_sensor` = 1', function(error, results, fields){
            if(error)
            {throw error;}
            results.forEach(result=>{
                if(result.id_sensor==1){
              console.log(result.Lectura);
              lectura_Servidor = result.Lectura.toString();
              sockData[0].sens_id=result.id_sensor.toString();

                }
            });
        });
         // enviar cadena
         sockData[0].lectura=lectura_Servidor;

         io.emit('sockData', sockData); // envia la lectura para mostrarla en la pagina web
         }

         else  // si no se reciben datos del puerto, entonces se escriben
{
  temp=0;

  conexion.query('UPDATE `sensor` SET `Lectura` = '+temp+',  `Activo` = '+1+'  WHERE `sensor`.`id_sensor` = 1', function(error, results, fields){
    if(error)
    {throw error;}
    else{
        console.log("Alta exitosa");
    }
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

