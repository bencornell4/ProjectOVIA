const loginOpen = document.querySelectorAll('button[name="login-open"]')

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target))
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((body) => {
        if (body) {
            document.getElementById("loginErrorMessage").style.display = "none";
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("loginButton").style.display = "none";
            document.getElementById("profileButton").style.display = "inline-block";
        } else {
            document.getElementById("loginErrorMessage").style.display = "block";
        }
    }).catch((error) => {
        console.error("Error: ", error);
    });
});

loginOpen.forEach(element => { element.addEventListener('click', function() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
    });
});

document.getElementById("loginCancel").addEventListener('click', function() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("loginErrorMessage").style.display = "none";
});