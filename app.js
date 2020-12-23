
const dataDiv = document.querySelector('#data');
const button = document.querySelector('.fas fa-search')



  
// form.document.querySelector('submit', inputState);
// console.log(form)


function inputState(e){
      e.preventDefault();
      const form = document.querySelector('.form');
      const input = document.querySelector('.input').value;
      form.addEventListener('submit', getData)
      getData(input)

}



//make a request  through the axios client

async function getData(state) {
      const stateUrl = `https://api.openbrewerydb.org/breweries?by_state=${state}`
      try {
      const res = await axios.get(`${stateUrl}`);
            const data = res.data;
            console.log(data)
            console.log(data[0].name)    
            console.log(data[0].street)    
            console.log(data[0].city)    
            console.log(data[0].state)        
            console.log(data[0].phone)    
            console.log(data[0].website_url)    
            showData(data)
      }catch(error) {
            console.log(error)

      }

};
 getData('georgia')

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
                  <p>${data.website_url}</p><br/>
            `        
      dataDiv.append(breweryInfo)
      });
}
showData(data)







