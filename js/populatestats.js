var statsDisplay = document.getElementById("statsDisplay");
var nameDisplay = document.getElementsByClassName("stats-container")[0].firstElementChild;

function getHoveredImage(e) {
    return document.elementFromPoint(e.clientX, e.clientY);
}

function getStatsElement(gameName) {
    return document.getElementById(`${gameName}Stats`);
}

function populateStats(e) {
    //display stats block
    var element = getHoveredImage(e);
    var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    var username = element.parentElement.parentElement.nextElementSibling.firstElementChild.getElementsByTagName("h3")[0].textContent;
    statsDisplay.style.left = (element.offsetLeft + element.offsetWidth) / rootFontSize + 1 + "rem";
    statsDisplay.style.top = element.offsetTop / rootFontSize + "rem";
    statsDisplay.style.display = "inline-block";

    //populate stats
    nameDisplay.textContent = username;
    var gameStats = getStatsElement("fortnite");
    fortniteRequests(username, gameStats);
}

function depopulateStats() {
    var gameStats = getStatsElement("fortnite");
    nameDisplay.textContent = "Loading...";
    gameStats.textContent = "Loading...";
    statsDisplay.style.display = "none";
}
