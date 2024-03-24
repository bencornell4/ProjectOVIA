const { getProfPage } = require("../utils/populateprofile.js");
const { reqUser } = require("../utils/fetchusername.js");
const { fetchProfileData } = require('../utils/fetchprofiledata.js');

const spinnerOverlay = document.getElementById('spinner-overlay');

window.addEventListener('popstate', function() {
    location.reload();
});

//load profile page if path is correct
window.onload = async function () {
    //start loading animation
    if (window.location.pathname.length > 1) {
        checkUser();
    } else {
        profNotLoading = new CustomEvent("profNotLoading");
        document.dispatchEvent(profNotLoading);
    }
    //check if a user is logged in
    userCheck = await reqUser();
    if (userCheck) {
        //set prof pic
        fetchProfileData(userCheck)
            .then((data) => {
                document.getElementById("profileButton").firstChild.firstChild.src = data.profPic;
            });
        //show restricted buttons
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("profileButton").style.display = "inline-block";
        document.getElementById("signOutButton").style.display = "inline-block";
        document.getElementById("uploadButton").style.display = "inline-block";
    }
}

function hideSpinner() {
    spinnerOverlay.style.background = "rgba(0, 0, 0, 0.5)";
    spinnerOverlay.style.display = 'none';
}

document.addEventListener("contentLoadedProfile", hideSpinner);
document.addEventListener("contentLoadedMain", hideSpinner);

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
                //end loading animation?
                document.removeEventListener("contentLoadedMain", hideSpinner);
                getProfPage(username);
            } else {
                profNotLoading = new CustomEvent("profNotLoading");
                document.dispatchEvent(profNotLoading);
                //user not found
            }
        })
        .catch((error) => {
            console.error('Profile does not exist: ', error);
        });
}



