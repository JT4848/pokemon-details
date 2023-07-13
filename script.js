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


const renderPokemon = (pokeArr) => {
  const pokeNames = pokeArr.map((pokemon) => {
    const poke = pokemon.url.split(`/`);
    const pokeNum = poke[6];
    return `<a id="myA" data-poke-num="${pokeNum}" href=""><li>${pokemon.name}</li><a>`;
  }).join(``);
  // console.log(pokeNames);
  document.querySelector(`ul`).innerHTML = pokeNames;

  const links = document.querySelectorAll(`#myA`);
  // console.log(links)
  for(let i = 0; i < links.length; i++){
    links[i].addEventListener(`click`, async (event) => {
      event.preventDefault();
      const number = links[i].dataset.pokeNum;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
      const data = await response.json();
      console.log(`hello`);
    })
  }
}

allPokemon();

