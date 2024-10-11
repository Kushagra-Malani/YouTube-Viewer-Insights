chrome.storage.local.get(["avgTime", "shorts", "flag"], function(result) {
    updateUI(result);
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "local") {
        chrome.storage.local.get(["avgTime", "shorts", "flag"], function(result) {
            updateUI(result);
        });
    }
});

function updateUI(result) {
    document.getElementById("avgTimeDisplay").textContent = result.avgTime ? result.avgTime + " seconds" : "No data yet";
    document.getElementById("totalShorts").textContent = result.shorts ? result.shorts + " shorts watched" : "No data yet";
}

async function resetData() {
    try {
        await chrome.storage.local.set({ avgTime: 0, shorts: 0, flag: true });
        updateUI({ avgTime: 0, shorts: 0, flag: true });
    } catch (error) {
        console.error("Error resetting data: ", error);
    }
}
document.getElementById("resetButton").addEventListener("click", resetData);

document.getElementById("homeButton").addEventListener("click", function() {
    chrome.tabs.create({ url: chrome.runtime.getURL("home.html") });
});