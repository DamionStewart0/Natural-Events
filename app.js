const url ='https://api.openbrewerydb.org/breweries';
const button = document.querySelector('.button');
const input = document.querySelector('.input');
const safe = '';


  


//make a request  through the axios client

async function getData() {
      try {
const res = await axios.get('https://api.openbrewerydb.org/breweries');
            const data = res.data;
            console.log(data)

      }catch(error) {
            console.log(error)

      }

}




