const { reqUser } = require("../utils/requser.js");
const { fetchGameData } = require("../utils/fetchgamedata.js");
var statsDisplay = document.getElementById("statsDisplay");
var nameDisplay = document.getElementsByClassName("stats-container")[0].firstElementChild;
let sameEvent = false;

function getHoveredImage(e) {
    return document.elementFromPoint(e.clientX, e.clientY);
}

function getStatsElement(gameName) {
    return document.getElementById(`${gameName}Stats`);
}

document.addEventListener('click', (event) => {
    //disables mouse out when clicking through to profile page
    if (event.target.name == ("populate-stats-hover-user") || event.target.name == ("populate-stats-hover-feed")) {
        sameEvent = false;
    }
})

document.addEventListener('mouseover', (event) => {
    if (sameEvent) {
        return;
    }
    if (event.target.name == "populate-stats-hover-feed") { 
        var element = getHoveredImage(event);
        var username = element.parentElement.parentElement.nextElementSibling.firstElementChild.getElementsByTagName("h3")[0].textContent;
        populateStatsBlock(element, username, 0);
    } else if (event.target.name == "populate-stats-hover-user") {  
        var element = getHoveredImage(event);
        populateStatsBlock(element, reqUser(), 2.5 * element.offsetWidth);
    }
});

function populateStatsBlock(element, username, rightOffset) {
    //display stats block
    var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    //statsDisplay.style.left = (element.offsetLeft + element.offsetWidth) / rootFontSize + 1 + "rem";
    //statsDisplay.style.top = element.offsetTop / rootFontSize + "rem";
    statsDisplay.style.top = (element.offsetTop + element.offsetHeight) / rootFontSize + 1 + "rem";
    statsDisplay.style.left = (element.offsetLeft - rightOffset) / rootFontSize + "rem";
    statsDisplay.style.display = "inline-block";
    nameDisplay.textContent = username;
    var gameStats = getStatsElement("fortnite");
    fetchGameData(username, gameStats);
    sameEvent = true;
}

document.addEventListener('mouseout', (event) => {
    if (sameEvent) {
        var gameStats = getStatsElement("fortnite");
        nameDisplay.textContent = "Loading...";
        gameStats.textContent = "Loading...";
        statsDisplay.style.display = "none";
        sameEvent = false;
    }
});