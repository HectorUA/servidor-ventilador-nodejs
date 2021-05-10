
const SerialPort = require('serialport');
const port = new SerialPort('COM5');


  
  // open errors will be emitted as an error event
  port.on('error', function (err) {
    console.log('Error: ', err.message);
  })
  
 /* 
  port.on('data', function (data) {
    let temp = parseInt(data, 10) + " °C";
  
         // Recibir cadena
    console.log('recv: ' + data);
         // enviar cadena
         io.emit('temp', data.toString());
  
  });*/

  module.exports=port;