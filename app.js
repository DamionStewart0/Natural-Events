const safe = ''
const dataDiv = document.querySelector('#data');
const button = document.querySelector('.button')
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const stateUrl = `https://api.openbrewerydb.org/breweries?by_state=${input.value}`

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFtaW9uc3Rld2FydCIsImEiOiJja2owZ3VubjAxZTZpMnducmNiMm5pbGQ4In0.MILn0pnZ0lmlv97rr_c4cQ';

      // get client location
      navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});

      function successLocation(position) {
            console.log(position)
            setUpMap([position.coords.longitude, position.coords.latitude])
            
      }

      // default location if user do not allow geolocation
      function errorLocation () {
            setUpMap([-119.9537, 39.2481])

      }

      // Initialise map
      function setUpMap(center) {
            const map = new mapboxgl.Map({
                  container: 'map',
                  style: 'mapbox://styles/mapbox/dark-v10', 
                  center: center,
                  zoom: 15 
            }); 
            const navigator = new mapboxgl.NavigationControl(); // adds navigation controls
            map.addControl(navigator)

            let marker = new mapboxgl.Marker()
            .setLngLat([30.5, 50.5])
            .addTo(map);

      //       map.addControl(
      //             new MapboxGeocoder({
      //             accessToken: mapboxgl.accessToken,
      //             mapboxgl: mapboxgl
      //             })
      // );
      };
      
     

     // generate marker from the long & lat found in data
      // function generateMarker() {
      //       data.forEach((data) => {
      //       const markers = new mapboxgl.Marker().setLngLat([data.longitude, data.latitude]).addTo(map)
      //       console.log(data, markers)
      //      })
      // }
      // generateMarker(getData())



//make a request  through the axios client

async function getData() {
      
      console.log(stateUrl)
      try {
      const res = await axios.get(`${stateUrl}`);
            const data = res.data;
            console.log(data)
      //       console.log(data[2].name)    
      //       console.log(data[0].street)    
      //       console.log(data[0].city)    
      //       console.log(data[0].state)        
      //       console.log(data[0].phone)    
      //       console.log(data[0].website_url)    
            showData(data)
            showDiv()
      }catch(error) {
            console.log(error)

      }

};

// show the data-container div only when called
function showDiv() {
      document.querySelector('.data-container').style.visibility='visible'
}

 

function showData(data) {
      dataDiv.innerHTML = ''

      data.forEach((data) => {
            let breweryInfo = document.createElement('div');
            breweryInfo.innerHTML =
                  `
                  <h4>${data.name}</h4>
                  <p>${data.street}</p>
                  <p>${data.city}</p>
                  <p>${data.state}</p>
                  <p>${data.postal_code}</p>
                  <p>${data.phone}</p>
                  <p>${data.longitude}</p>
                  <p>${data.latitude}</p>
                  <p><a href='${data.website_url}'>WEBSITE</a></p><br/><hr/>
            `      
      dataDiv.append(breweryInfo)
      });
     
      
}


button.addEventListener('click', getData)








