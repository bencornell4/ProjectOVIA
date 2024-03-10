const { getProfPage } = require("../utils/populateprofile.js");
const { reqUser } = require("../utils/requser.js");

document.addEventListener("click", (event) => {
    if (event.target.name == "populate-stats-hover-user") {
        username = reqUser();
        history.pushState({}, '', `/${username}`);
        getProfPage(username);
    }
});