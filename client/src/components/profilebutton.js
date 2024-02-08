const username = "ben";
const { getProfPage } = require("../utils/populateprofile.js");

document.addEventListener("click", (event) => {
    if (event.target.name == "populate-stats-hover-user") {
        history.pushState({}, '', `/${username}`);;
        getProfPage(username);
    }
});