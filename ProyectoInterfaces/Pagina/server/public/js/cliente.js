const socket = io();
const activDisplay = document.getElementById('temperature');
const idDisplay = document.getElementById('id_sens');


socket.on('sockData', function (data) {
  data.map(function(elem, index){

    console.log("pagina:serv:"+elem.lectura);
    id_sens.innerHTML = `${elem.sens_id}`;
    temperature.innerHTML     = `${elem.lectura}°C`;
  })
});