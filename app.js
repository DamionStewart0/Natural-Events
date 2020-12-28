
const dataDiv = document.querySelector('#data');
const button = document.querySelector('.button')
const form = document.querySelector('.form');
const input = document.querySelector('.input');
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFtaW9uc3Rld2FydCIsImEiOiJja2owZ3VubjAxZTZpMnducmNiMm5pbGQ4In0.MILn0pnZ0lmlv97rr_c4cQ';


      navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});

      function successLocation(position) {
            console.log(position)
            setUpMap([position.coords.longitude, position.coords.latitude])
            
      }

      function errorLocation () {
            setUpMap([51.50, 0.126])

      }

      function setUpMap(center) {
            const map = new mapboxgl.Map({
                  container: 'map',
                  style: 'mapbox://styles/mapbox/streets-v11', 
                  center: center, 
                  zoom: 12 
            }); 
            const navigator = new mapboxgl.NavigationControl();
            map.addControl(navigator)
            

      }

//make a request  through the axios client

async function getData() {
      const stateUrl = `https://api.openbrewerydb.org/breweries?by_state=${input.value}`
      console.log(stateUrl)
      try {
      const res = await axios.get(`${stateUrl}`);
            const data = res.data;
            // console.log(data)
            // console.log(data[2].name)    
            // console.log(data[0].street)    
            // console.log(data[0].city)    
            // console.log(data[0].state)        
            // console.log(data[0].phone)    
            // console.log(data[0].website_url)    
            showData(data)
            showDiv()
      }catch(error) {
            console.log(error)

      }

};

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
                  <p><a href='${data.website_url}'>WEBSITE</a></p><br/><hr/>
            `        
      dataDiv.append(breweryInfo)
      });
}


button.addEventListener('click', getData)








