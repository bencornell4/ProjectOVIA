const { getProfPage } = require("../utils/populateprofile.js");
const { reqUser } = require("../utils/fetchusername.js");

document.addEventListener("click", async (event) => {
    if (event.target.name == "populate-stats-hover-user") {
        //get username from cookies
        username = await reqUser();
        //open profile page
        history.pushState({}, '', `/${username}`);
        location.reload();
    }
    if (event.target.dataset.name == "populate-stats-hover-feed") {
        //get username from post data
        username = event.target.parentNode.parentNode.parentNode.children[1].children[0].children[0].textContent;
        //open profile page
        history.pushState({}, '', `/${username}`);
        location.reload();
    }
});