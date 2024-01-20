const loginOpen = document.querySelectorAll('button[name="login-open"]')

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
});

loginOpen.forEach(element => { element.addEventListener('click', function() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
    });
});

document.getElementById("loginCancel").addEventListener('click', function() {
    document.getElementById("loginForm").style.display = "none";
});