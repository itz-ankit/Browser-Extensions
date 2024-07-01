// script.js
const jokeEl = document.getElementById("joke");
const newJokeBtn = document.getElementById("newJokeBtn");

async function fetchJoke() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const response = await fetch("https://icanhazdadjoke.com/", config);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    jokeEl.textContent = data.joke;
  } catch (error) {
    jokeEl.textContent = "Failed to fetch a joke. Try again!";
  }
}

// newJokeBtn.addEventListener("click", fetchJoke);

// Fetch a joke on initial load
fetchJoke();
