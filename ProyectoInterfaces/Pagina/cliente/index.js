const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(__dirname+'/public'));


io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("COM5", {
  baudRate: 9600
});
port.on('error', function(err){
  console.log("error ----> " + err);
});

const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('open', function(){
  console.log('connection is opened');
});

parser.on('data', function (data) {
    let temp = parseInt(data, 10) + " °C";
    console.log(temp);
    io.emit('temp', data.toString());
    
  });
  
  parser.on('error', (err) => console.log(err));
