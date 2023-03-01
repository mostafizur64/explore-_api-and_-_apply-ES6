const countries = async () => {
  const URL = `https://restcountries.com/v3.1/all`;
  const res = await fetch(URL);
  const data = await res.json();
  showCounties(data.slice(0, 9));
}
const countryContainer = document.getElementById('containers-info');
countryContainer.innerHTML = '';
const showCounties = (countries) => {
  countries.slice(0, 20).forEach((country) => {
    console.log(country.cca2)
    const div = document.createElement('div');
    div.innerHTML = `
  <div class="card w-full h-96 bg-base-100 shadow-xl">
  <figure><img src="${country.flags.png}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${country.name.common}</h2>
    <p>Population : ${country.population}</p>
    <div class="card-actions justify-center">
    <label onclick="showDetails('${country.cca2}')" class="btn btn-primary" href="#my-modal-3" for="my-modal-3" for="my-modal-3" >open modal</label>
    </div>
  </div>
</div>
  `;
    countryContainer.appendChild(div);
  });
}


//show details on modal
const showDetails = async (id) => {
  const url = `https://restcountries.com/v3.1/alpha/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showOnModal(data[0]);
  
}
const showOnModal = (value) => {
  
 
  const modalContainer = document.getElementById('modal-container');

  const div = document.createElement('div');
  div.classList.add("modal");
  div.innerHTML = `
  <div class="modal-box relative">
  <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
  <img src="${value.flags.png}">
  <h3 class="text-lg font-bold">${value.name.common}</h3>
  <p class="py-4">Population:${value.population}</p>
  <p class="py-4">Currencies:${Object.keys(value.currencies)[0]}</p>
</div>
`;
modalContainer.appendChild(div);





}

countries();



// show more 

const showMore = async () => {
  const URL = `https://restcountries.com/v3.1/all`;
  const res = await fetch(URL);
  const data = await res.json();
  showCounties(data);

}







