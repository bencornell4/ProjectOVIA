const { fetchProfileData } = require('../utils/fetchprofiledata.js');

const signupOpen = document.querySelectorAll('button[name="signup-open"]')
const overlay = document.getElementById('signup-overlay');

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    fetch(event.target.action, {
        method: 'POST',
        credentials: 'include',
        body: new URLSearchParams(new FormData(event.target))
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((body) => {
        if (body) {
            //reload to reflect changes
            location.reload();
        } else {
            document.getElementById("signupErrorMessage").style.display = "block";
        }
    }).catch((error) => {
        console.error("Error signing up: ", error.message);
    });
});

signupOpen.forEach(element => { 
    element.addEventListener('click', function() {
        overlay.style.display = 'flex';
        document.getElementById("login-overlay").style.display = "none";
        document.getElementById("loginErrorMessage").style.display = "none";
    });
});

document.getElementById("signupCancel").addEventListener('click', function() {
    overlay.style.display = 'none';
    document.getElementById("signupErrorMessage").style.display = "none";
});