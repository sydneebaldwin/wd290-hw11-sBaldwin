// Select the parts of the page we want JavaScript to control
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

// When the user clicks the button, run the getPokemon function
button.addEventListener("click", getPokemon);

// This lets the user press Enter instead of clicking the button
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getPokemon();
  }
});

// Show an error message and add the error class to the input and status text
function showError(message) {
  statusText.textContent = message;
  statusText.classList.add("error");
  input.classList.add("error");

  // Hide the old Pokémon card if something goes wrong
  clearCard();
}

// Remove the error class when the user is back in a normal state
function clearError() {
  statusText.classList.remove("error");
  input.classList.remove("error");
}

// Main function: get data from the API and place it into the page
async function getPokemon() {
  // Read what the user typed
  // toLowerCase() helps match PokéAPI naming style
  // trim() removes extra spaces before and after the name
  const pokemonName = input.value.toLowerCase().trim();

  // If the box is empty, stop and show an error message
  if (pokemonName === "") {
    showError("Please enter a Pokémon name.");
    return;
  }

  // Clear old errors before making a new request
  clearError();

  // Show a loading message so the user knows something is happening
  statusText.textContent = "Loading...";

  // Disable the button during loading so students can see a UI state change
  button.disabled = true;
  button.textContent = "Loading...";

  // Ask the PokéAPI for data
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

  // Check whether the API request worked
  if (response.ok) {
    // Convert the response into JSON so JavaScript can use the data
    const data = await response.json();

    // Print the full object into the console for debugging and learning
    console.log("Full API response:", data);

    // Pull out a few pieces of data we want to show in the page
    const pokemonType = data.types[0].type.name;
    const pokemonImage = data.sprites.front_default;

    // Put the data into the DOM
    nameText.textContent = data.name;
    typeText.textContent = pokemonType;
    image.src = pokemonImage;
    image.alt = `${data.name} sprite`;
    heightText.textContent = data.height;
    weightText.textContent = data.weight;
    idText.textContent = data.id;

    // Reveal the card once we have good data
    pokemonCard.classList.remove("hidden");

    // Update the status message
    statusText.textContent = "Pokémon loaded.";
  } else {
    // If the name is wrong or not found, show a friendly error
    showError("Could not find that Pokémon. Try another name.");
  }

  // Turn the button back on after the request is finished
  button.disabled = false;
  button.textContent = "Search";
}

// Clear the card content and hide it
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