const { fetchProfileData } = require('../utils/fetchprofiledata.js');

const loginOpen = document.querySelectorAll('button[name="login-open"]')
const overlay = document.getElementById('login-overlay');

document.getElementById("loginForm").addEventListener("submit", function(event) {
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
            document.getElementById("loginErrorMessage").style.display = "block";
        }
    }).catch((error) => {
        console.error("Error logging in: ", error);
    });
});

loginOpen.forEach(element => { 
    element.addEventListener('click', function() {
        overlay.style.display = "flex";
        document.getElementById("signup-overlay").style.display = "none";
        document.getElementById("signupErrorMessage").style.display = "none";
    });
});

document.getElementById("loginCancel").addEventListener('click', function() {
    overlay.style.display = 'none';
    document.getElementById("loginErrorMessage").style.display = "none";
});