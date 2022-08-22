
const input = document.querySelector('#input');
const btn = document.querySelector('.btn');
const mapcontainer = document.querySelector('#map');
const ip = document.querySelector('#ip');
const zone = document.querySelector('#location');
const time = document.querySelector('#utc');
const isp = document.querySelector('#isp');



const bypassCors = 'https://cors.anywhere.heroku.com/';
const url = 'https://geo.ipify.org/api';
let currVersion = 'v1'

const headersOption = {
        headers: {
            'Access-Control-Allow-Origin': '*  '
        }
}


//initialize map
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

 marker = L.marker([51.5, -0.09]).addTo(map);

 function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

  fetch('http://ipwho.is/8.8.4.4')
    .then(res => res.json())
    .then(data => {
            ip.innerText = data.ip
            zone.innerText = data.city+ ',' + ' ' + data.region_code + ' ' + data.postal
            time.innerText = data.timezone.utc
            isp.innerText = data.connection.org
            console.log(data)
            map.setView([data.latitude, data.longitude])
          marker =  L.marker([data.latitude, data.longitude]).addTo(map)

    }).catch(error => alert('Oops! Error Occured Try Again'))
