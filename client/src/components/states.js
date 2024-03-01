const { getProfPage } = require("../utils/populateprofile.js");

window.addEventListener('popstate', function() {
    location.reload();
});

//load profile page if path is correct
window.onload = function () {
    if (window.location.pathname.length > 1) {
        checkUser();
    }
}

//load profile page if user is valid
function checkUser() {
    const username = window.location.pathname.substring(1);
    fetch(`http://localhost:3000/api/confirmuser/${username}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response not ok");
            }
            return response.json;
        })
        .then((data) => {
            if (data) {
                getProfPage(username);
            } else {
                //user not found
            }
        })
        .catch((error) => {
            console.error('Profile does not exist: ', error);
        });
}



