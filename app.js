
const input = document.querySelector('#input');
const btn = document.querySelector('.btn');
const mapcontainer = document.querySelector('#map');
const ip = document.querySelector('#ip');
const zone = document.querySelector('#location');
const time = document.querySelector('#utc');
const isp = document.querySelector('#isp');
const form = document.querySelector('form');

let userIp = '192.212.174.101';
let url = `"http://ipwho.is/${userIp}"`;


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

function fetchIp(url){
  fetch(url)
    .then(res => res.json())
    .then(data => {
            ip.innerText = data.ip
            zone.innerText = data.city+ ',' + ' ' + data.region_code + ' ' + data.postal
            time.innerText = data.timezone.utc
            isp.innerText = data.connection.org
            map.setView([data.latitude, data.longitude])
           L.marker([data.latitude, data.longitude]).addTo(map)
           input.value = ''

    })
     .catch(error => setError(input, 'Oops! Error Occured Try Again'))
};

// Load Defalut ip onLoad

window.addEventListener('DOMContentLoaded', ()=>{
    fetchIp(url)
})


     
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(input.value === ''){
        setError(input, 'cant be blank')
    }

    else if(ipAddressCheck(input)){
      userIp =  input.value
       fetchIp(userIp) 
      
    }
    

})

    // error handler function
   function setError(input, message){
      const small = input.parentElement.lastElementChild;

      small.innerText = message
      input.style.border = '1px solid red'

      setTimeout(()=>{
        small.innerText= ''
        input.style.border = ''
      }, 2000)
    }


function ipAddressCheck(input)
{
   var regEx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

   if(input.value.match(regEx))
     {
      return true;
     }
   else
     {
     setError(input, "Please enter a valid ip Address.");
     return false;
     }
}    