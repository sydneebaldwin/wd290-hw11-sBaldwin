const input = document.querySelector("#pokemonInput");
const button = document.querySelector("#searchBtn");
const statusText = document.querySelector("#status");
const pokemonCard = document.querySelector("#pokemonCard");
const nameText = document.querySelector("#pokemonName");
const typeText = document.querySelector("#pokemonType");
const image = document.querySelector("#pokemonImage");
const heightText = document.querySelector("#pokemonHeight");
const weightText = document.querySelector("#pokemonWeight");
const idText = document.querySelector("#pokemonId");

button.addEventListener("click", getPokemon);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getPokemon();
  }
});

async function getPokemon() {
  const pokemonName = input.value.toLowerCase().trim();

  if (pokemonName === "") {
    statusText.textContent = "Please enter a Pokémon name.";
    return;
  }

  statusText.textContent = "Loading...";

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

  if (response.ok) {
    const data = await response.json();

    nameText.textContent = data.name;
    image.src = data.sprites.front_default;
    image.alt = data.name;
    heightText.textContent = `Height: ${data.height}`;
    weightText.textContent = `Weight: ${data.weight}`;

    statusText.textContent = "Pokémon loaded.";
  } else {
    statusText.textContent = "Could not find that Pokémon. Try another name.";
    nameText.textContent = "";
    image.src = "";
    image.alt = "";
    heightText.textContent = "";
    weightText.textContent = "";
  }
}
function clearCard() {
  pokemonCard.classList.add("hidden");
  nameText.textContent = "";
  typeText.textContent = "";
  image.src = "";
  image.alt = "";
  heightText.textContent = "";
  weightText.textContent = "";
  idText.textContent = "";
}
