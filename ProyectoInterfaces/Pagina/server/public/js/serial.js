
const SerialPort = require('serialport');  //se incializa la libreria que se utilizara
const port = new SerialPort('COM5'); //se establece el puerto donde esta conectado el arduino


  
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

  module.exports=port;   //se habilita la variable para poder utilizarla desde otro archivo