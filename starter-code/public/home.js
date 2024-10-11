chrome.storage.local.get(["avgTime", "shorts", "flag"], function(result) {
    updateUI(result);
});

function updateUI(result) {
    document.getElementById("shortsHome").textContent = result.shorts ? result.shorts + " shorts watched" : "No data yet";
}