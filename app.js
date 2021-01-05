  
const dataDiv = document.querySelector('#data');
const button = document.querySelector('.button')
const form = document.querySelector('.form');
const input = document.querySelector('.input');
let currentLongitude;
let currentLatitude;


mapboxgl.accessToken = 'pk.eyJ1IjoiZGFtaW9uc3Rld2FydCIsImEiOiJja2owZ3VubjAxZTZpMnducmNiMm5pbGQ4In0.MILn0pnZ0lmlv97rr_c4cQ';

      // get client location
      navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});

      function successLocation(position) {
            console.log(position)
            currentLongitude = position.coords.longitude;
            currentLatitude = position.coords.latitude;
                                                   
            setUpMap([[currentLongitude, currentLatitude]])
            
      }

      // default location if user do not allow geolocation
      function errorLocation () {
            setUpMap([[-119.9537, 39.2481]])

      }

      // Initialise map
      function setUpMap(center) {
            const map = new mapboxgl.Map({
                  container: 'map',
                  style: 'mapbox://styles/mapbox/dark-v10', 
                  center: center[0],
                  zoom: 7
            }); 
            
            const navigator = new mapboxgl.NavigationControl(); // adds navigation controls
            map.addControl(navigator)

            center.forEach((brewery)=> {
                  let marker = new mapboxgl.Marker().setLngLat(brewery).addTo(map)
            })
   
      };
      
     

      



//make a request  through the axios client to the open brewery db api

async function getData() {
      const stateUrl = `https://api.openbrewerydb.org/breweries?by_state=${input.value}`
      
      console.log(stateUrl)
      try {
      const res = await axios.get(`${stateUrl}`);
            const data = res.data;  
            showData(data)
            showDiv()
      }catch(error) {
            console.log(error)
      }

};

// show the data-container div when search button is clicked
function showDiv() {
      document.querySelector('.data-container').style.visibility='visible'
}

 
// rendering the data to the page
function showData(data) {
      dataDiv.innerHTML = ''

      const breweries = [];
      data.forEach((data)=> {
            breweries.push([data.longitude, data.latitude]) // filter the lng and lat into an array
      })
      setUpMap(breweries) 

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
                  <p><a href='${data.website_url}' target='_blank'>WEBSITE</a></p><br/><hr/>
            `      
      dataDiv.append(breweryInfo)
      });
     
      
}


button.addEventListener('click', getData)








