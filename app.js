const container = document.querySelector('.countries-container');
const detailsContainer = document.querySelector('.container');
const containerDetails = document.querySelector('.details-container');
const input = document.querySelector('#search');
const error = document.querySelector('.error-msg');
const select = document.querySelector('#select');
const btn = document.querySelector('.countries-container');
const region = document.querySelector('.regions-container');


//Fetch and display all countries
document.addEventListener('DOMContentLoaded', (e)=>{
  const url = 'https://restcountries.eu/rest/v2/all';

  fetchCountries(url);
})

//Search for countries by name
input.addEventListener('keyup', (e)=>{
  const url = `https://restcountries.eu/rest/v2/name/${e.target.value}?fullText=true`;

  searchByName(url, e.target.value);
})

//Search for countries by region
select.addEventListener('change', (e)=>{
  const regionUrl = `https://restcountries.eu/rest/v2/region/${select.value}`;
  const url = 'https://restcountries.eu/rest/v2/all';

  //Check if the container is not empty, then set the content to empty and call the function to display the region countries
  if(select.value === 'filter'){
    fetchCountries(url);
  }
  if(region.innerHTML != ''){
    region.innerHTML = ''
    searchByRegion(regionUrl);
  }
});

// Show country details
btn.addEventListener('click', (e)=>{
  e.preventDefault()
  countryDetails(e.target.parentElement)
})

//Go back
// const goBack = document.querySelector('.go');
// goBack.addEventListener('click', ()=>{
//   console.log('going back')
//   window.location.href = 'index.html'
//   const container = document.querySelector('.countries-container');

//     container.innerHTML = ''
// })

//Function to fetch all countries and display
function fetchCountries(url){
  fetch(url)
  .then(res => res.json())
  .then(data => data.map((country)=>{
  container.innerHTML += `

  <div class="country">
    <img src=${country.flag} alt="">
    <h3 class="name">${country.name}</h3>
    <h4 class="population">Population: ${country.population}</h4>
    <h4 class="region">Region: ${country.region}</h4>
    <h4 class="capital">Capital: ${country.capital}</h4>
  </div>
  `
  }))
  .catch(err => 
    container.innerHTML = `
      <h2>${err.message}</h2>
    `)
}

//Function to search countries by name
function searchByName(url, input){
  fetch(url)
   .then(res => res.json())
   .then(data => data.map((country)=>{
       container.innerHTML = `
   <div class="country">
      <img src=${country.flag} alt="">
      <h3 class="name">${country.name}</h3>
      <h4 class="population">Population: ${country.population}</h4>
      <h4 class="region">Region: ${country.region}</h4>
      <h4 class="capital">Capital: ${country.capital}</h4>
    </div>
   `
   }))
   .catch(err => {
     if(err.message === 'data.map is not a function'){
      container.innerHTML = `
      <h2 class="error-msg">"${input}" does not exist</h2>
    `
    }else if (err.message === 'Unexpected end of JSON input'){
      container.innerHTML = ''
      const allCountries = 'https://restcountries.eu/rest/v2/all';
      fetchCountries(allCountries);
    }
    console.log(err.message) 
    })
}

//Function to search countries by region
function searchByRegion(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => data.map(regional => {
    region.innerHTML += `
    <div class="country">
      <img src=${regional.flag} alt="">
      <h3 class="name">${regional.name}</h3>
      <h4 class="population">Population: ${regional.population}</h4>
      <h4 class="region">Region: ${regional.region}</h4>
      <h4 class="capital">Capital: ${regional.capital}</h4>
    </div>   
  `
    container.innerHTML = '';
  }))
	}


  //Function to display country details
  // function countryDetails(parent){
  //   const searchTerm = parent.children[1].textContent;
  // const url = `https://restcountries.eu/rest/v2/name/${searchTerm}?fullText=true`;
  // fetch(url)
  // .then(res => res.json())
  // .then(data => { data.map(country => {
  //   console.log(data)

  //   detailsContainer.innerHTML = `
  //   <button class="go-back" onClick="handleClick()">Back</button>
  //   <div class="details-container">
  //     <div class="flag-container">
  //       <img src=${country.flag} alt="${country.name}-flag"
  //     </div>
  //     <div class="country-details">
  //       <h3 class="country-details-name">${country.name}</h3>
  //       <div>
  //         <div class="country-subdetails-left">

  //         </div>
  //         <div class="country-subdetails-right">

  //         </div>
  //       </div>
  //       <div>
  //       <h5 class="border-countries">Border Countries: </h5>
  //       <div class="border"></div>
  //       <div class="border"></div>
  //       <div class="border"></div>
  //       </div>
  //     </div>
  //   </div>
  //   `
  // })
    
  // })
  // }

  function handleClick(){
    window.history.go(-1);
    console.log('going back')
  }