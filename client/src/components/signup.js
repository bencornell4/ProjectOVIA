const signupOpen = document.querySelectorAll('button[name="signup-open"]')

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("signupForm").style.display = "none";
});

signupOpen.forEach(element => { element.addEventListener('click', function() {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    });
});

document.getElementById("signupCancel").addEventListener('click', function() {
    document.getElementById("signupForm").style.display = "none";
});