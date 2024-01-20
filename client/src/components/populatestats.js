const { fortniteRequests } = require("../utils/gamedata.js");
var statsDisplay = document.getElementById("statsDisplay");
var nameDisplay = document.getElementsByClassName("stats-container")[0].firstElementChild;

function getHoveredImage(e) {
    return document.elementFromPoint(e.clientX, e.clientY);
}

function getStatsElement(gameName) {
    return document.getElementById(`${gameName}Stats`);
}

let sameEvent = false;

document.getElementById("postContainer").addEventListener('mouseover', (event) => {
    if (sameEvent) {
        return;
    }
    if (event.target.name == "populate-stats-hover") {  
        //display stats block
        var element = getHoveredImage(event);
        var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        var username = element.parentElement.parentElement.nextElementSibling.firstElementChild.getElementsByTagName("h3")[0].textContent;
        statsDisplay.style.left = (element.offsetLeft + element.offsetWidth) / rootFontSize + 1 + "rem";
        statsDisplay.style.top = element.offsetTop / rootFontSize + "rem";
        statsDisplay.style.display = "inline-block";

        //populate stats
        nameDisplay.textContent = username;
        var gameStats = getStatsElement("fortnite");
        fortniteRequests(username, gameStats);
        sameEvent = true;
    }
});

document.getElementById("postContainer").addEventListener('mouseout', (event) => {
    if (sameEvent) {
        var gameStats = getStatsElement("fortnite");
        nameDisplay.textContent = "Loading...";
        gameStats.textContent = "Loading...";
        statsDisplay.style.display = "none";
        sameEvent = false;
    }
});