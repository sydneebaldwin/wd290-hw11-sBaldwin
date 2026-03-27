console.log("js is loaded");

const resultText = document.getElementById("joke");
const statusText = document.getElementById("subhead");
const button = document.getElementById("jokeButton");

console.log("Selected elements:", { resultText, statusText, button});

async function getData() {
  statusText.textContent = "Loading...";
  resultText.textContent = "";

  if (button) {
    button.disabled = true;
    button.textContent = "Loading...";
  }

  const response = await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single");
  
  if (response.ok) {
  const data = await response.json();

  console.log("Full API response:", data);

  resultText.textContent = data.joke;
  statusText.textContent = "Joke loaded.";
} else {
  showError("ERROR WHAAAAAAAAA");
}


  if (button) {
    button.disabled = false;
    button.textContent = "Generate A Joke";
  }
}

if (button) {
  button.addEventListener("click", getData);
}
