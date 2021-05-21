const socket = io();
const activDisplay = document.getElementById('activ_vent');
const idDisplay = document.getElementById('id_vent');


socket.on('sockData', function (data) {
  data.map(function(elem, index){

    console.log("pagina:serv:"+elem.lectura);
    id_vent.innerHTML = `${elem.vent_id}`;
    activ_vent.innerHTML     = `${elem.send}`;
  })
});