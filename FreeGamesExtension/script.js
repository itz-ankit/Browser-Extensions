let currentPage = 1;
const gamesPerPage = 20;
let totalGames = 0;
let allGames = []; // For storing all games for search functionality

document.addEventListener("DOMContentLoaded", function () {
  fetchGames(currentPage);
});

function fetchGames(page) {
  const offset = (page - 1) * gamesPerPage;
  // Assuming the API returns games sorted alphabetically
  fetch(
    `https://www.freetogame.com/api/games?platform=all&sort-by=alphabetical`
  )
    .then((response) => response.json())
    .then((data) => {
      allGames = data; // Store all games for search functionality
      totalGames = data.length; // Assuming the API returns total games count
      const games = data.slice(offset, offset + gamesPerPage);
      updateGameList(games);
      updatePaginationControls();
    })
    .catch((error) => console.error("Error:", error));
}

function updateGameList(games) {
  const gameList = document.getElementById("gameList");
  gameList.innerHTML = ""; // Clear existing games
  games.forEach((game) => {
    const div = document.createElement("div");
    div.className = "game";

    const img = document.createElement("img");
    img.src = game.thumbnail;
    img.alt = game.title + " thumbnail";

    const detailsDiv = document.createElement("div"); // Container for game details

    const a = document.createElement("a");
    a.href = game.game_url;
    a.textContent = game.title;
    a.target = "_blank";

    const genreP = document.createElement("p");
    genreP.textContent = "Genre: " + game.genre;

    const releaseDateP = document.createElement("p");
    releaseDateP.textContent = "Release Date: " + game.release_date;

    detailsDiv.appendChild(a);
    detailsDiv.appendChild(genreP);
    detailsDiv.appendChild(releaseDateP);

    div.appendChild(img);
    div.appendChild(detailsDiv); // Append the details container to the game container
    gameList.appendChild(div);
  });
}

function updatePaginationControls() {
  const totalPages = Math.ceil(totalGames / gamesPerPage);
  document.getElementById("prevButton").style.visibility =
    currentPage > 1 ? "visible" : "hidden";
  document.getElementById("nextButton").style.visibility =
    currentPage < totalPages ? "visible" : "hidden";
}

document.getElementById("prevButton").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    fetchGames(currentPage);
    window.scrollTo(0, 0); // Scroll to the top of the page
  }
});

document.getElementById("nextButton").addEventListener("click", function () {
  const totalPages = Math.ceil(totalGames / gamesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    fetchGames(currentPage);
    window.scrollTo(0, 0); // Scroll to the top of the page
  }
});

// Search functionality
document.getElementById("searchButton").addEventListener("click", function () {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredGames = allGames.filter((game) =>
    game.title.toLowerCase().includes(query)
  );
  updateGameList(filteredGames); // Display only filtered games
});

document.getElementById("clearSearch").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  fetchGames(currentPage); // Fetch the current page games again to reset the list
  // Optionally, trigger any search reset or focus the input
  document.getElementById("searchInput").focus();
});
