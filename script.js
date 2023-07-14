

//get all pokemon
const allPokemon = async () => {
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = await response.json();
    console.log(data.results);
    renderPokemon(data.results);
  } catch(err){
    console.log(err);
    document.querySelector(`div`).innerHTML = `<h1>It aint working</h1>`;
  }
}

//render pokemon and getting single pokemon
const renderPokemon = (pokeArr) => {
  const pokeNames = pokeArr.map((pokemon) => {
    const poke = pokemon.url.split(`/`);
    const pokeNum = poke[6];
    return `<a id="myA" data-poke-num="${pokeNum}" href=""><li>${pokemon.name}</li><a>`;
  }).join(``);
  // console.log(pokeArr);
  document.querySelector(`ul`).innerHTML = pokeNames;
}



//event listeners for links
const clickingPoke = () => {
  const links = document.querySelectorAll(`#myA`);
    // console.log(links)
    for(let i = 0; i < links.length; i++){
      links[i].addEventListener(`click`, async (event) => {
        event.preventDefault();
        const number = links[i].dataset.pokeNum;
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
        const data = await response.json();
        console.log(data);
        const ulReset = document.querySelector('ul');
        ulReset.innerHTML = '';
        let detailsHtml = `<h1>${data.name}</h1>`
        document.querySelector(`#details`).innerHTML = detailsHtml;
        let imgHtml = `<img src = "${data.sprites.front_shiny}">`;
        document.querySelector(`#pokeImg`).innerHTML = imgHtml;
        let pokeButton = `<button>Go back</button>`;
        document.querySelector(`#backButton`).innerHTML = pokeButton;
        
        document.querySelector(`#backButton`).addEventListener(`click`, async (event) => {
          event.preventDefault();
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
          const data = await response.json();
          // console.log(data.results);
          renderPokemon(data.results);
          const nameReset = document.querySelector(`#details`);
          nameReset.innerHTML = ``;
          const imgReset = document.querySelector(`#pokeImg`);
          imgReset.innerHTML = ``;
          const buttonReset = document.querySelector(`#backButton`);
          buttonReset.innerHTML = ``;
        })
        
      })
    }
}


const init = async () => {
  await allPokemon()
 
  clickingPoke();

}
init();