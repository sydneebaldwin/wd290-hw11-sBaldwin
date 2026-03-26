
// Joke Generator Homework Hints
// Use this file as a guide, not as a full answer.

// 1. Select the elements you need from the page
const resultText = document.getElementById("YOUR_RESULT_ELEMENT_ID");
const statusText = document.getElementById("YOUR_STATUS_ELEMENT_ID");
const button = document.getElementById("YOUR_BUTTON_ID");

// 2. Create an async function that gets data from the API
async function getData() {
  statusText.textContent = "Loading...";
  resultText.textContent = "";

  if (button) {
    button.disabled = true;
    button.textContent = "Loading...";
  }

  const response = await fetch("YOUR_API_LINK_HERE");
  const data = await response.json();

  console.log("Full API response:", data);

  resultText.textContent = data.YOUR_PROPERTY_HERE;
  statusText.textContent = "Joke loaded.";

  if (button) {
    button.disabled = false;
    button.textContent = "Generate A Joke";
  }
}

if (button) {
  button.addEventListener("click", getData);
}