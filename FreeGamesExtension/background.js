chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "fetchGames") {
        fetch('https://www.freetogame.com/api/games')
            .then(response => response.json())
            .then(data => sendResponse({status: "success", data: data}))
            .catch(error => sendResponse({status: "error", error: error}));
        return true; // Keep the message channel open for the response
    }
});