
const button = document.querySelector('.button');
const input = document.querySelector('.input');
const form = document.querySelector('.form')



  


//make a request  through the axios client

async function getData(state) {
      const stateUrl = `https://api.openbrewerydb.org/breweries?by_state=${state}`
      try {
const res = await axios.get(`${stateUrl}`);
            const data = res.data;
            console.log(data)

      }catch(error) {
            console.log(error)

      }

}

getData('california')





