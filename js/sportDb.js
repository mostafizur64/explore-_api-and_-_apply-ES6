const SearchValue = (id) => {
  const inputElement = document.getElementById('input-field').value;
  document.getElementById('single-player-details').innerHTML = "";
  document.getElementById("male").classList.add('d-none');
  document.getElementById("female").classList.add('d-none');
  // document.getElementById('spinner').classList.remove,('d-done');
  toggleSpinner(true);

  // user tow parameter in function and show the value 
  const searchID = id || inputElement;

  const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchID}`;
  // // data get process 
  // const res = await fetch(URL);
  // const data = await res.json();
  // document.getElementById('spinner').classList.add('d-done');
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      // document.getElementById('spinner').classList.add('d-done');
      toggleSpinner(false)
      showPlayerData(data.player);
    });

}
const showPlayerData = (players) => {

  document.getElementById('input-field').value = '';
  const playerInfo = document.getElementById('player-info');
  playerInfo.innerHTML = '';
  players.forEach(player => {
    console.log(player);
    const { strPlayer, strThumb, strNationality, idPlayer } = player;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
      <img style="height: 250px" src="${strThumb ? strThumb : 'https://picsum.photos/500/300?random=4'}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${player.strPlayer}</h5>
        <p>Nationality : ${strNationality}</p>
        <div>
        <button onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-success">Details</button>
          <button type="button" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
    `;
    playerInfo.appendChild(div);


  });
}
const singlePlayer = (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  fetch(url)
    .then((res => res.json()))
    .then((data => showSingleData(data.players[0])))


}
const showSingleData = (data) => {
  const container = document.getElementById('single-player-details');
  container.innerHTML = "";
  console.log(data);
  const { strThumb, strPlayer, strNationality, strDescriptionEN, strBirthLocation, strGender } = data
  const div = document.createElement('div');

  // check the male and female condition 
  if (strGender === "Male") {

    document.getElementById("male").classList.remove("d-none");
  }
  else {
    document.getElementById("female").classList.remove("d-none");

  }



  div.classList.add('col');
  div.innerHTML = `
    <div class="card mb-3">
  <img src="${strThumb ? strThumb : 'https://picsum.photos/500/300?random=4'}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${strPlayer}</h5>
    <p class="card-text">BirthLocation :${strBirthLocation}</p>
    <p>Description :${strDescriptionEN ? strDescriptionEN.slice(0, 100) + '....' : "No info"}</p>
  </div>
</div>
    `;
  container.appendChild(div);


}
// user spinner section 

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  }
  else {
    loaderSection.classList.add('d-none');
  }

}
SearchValue('messi');


