const signupOpen = document.querySelectorAll('button[name="signup-open"]')

signupOpen.forEach(element => { element.addEventListener('click', function() {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    });
});

document.getElementById("signupCancel").addEventListener('click', function() {
    document.getElementById("signupForm").style.display = "none";
});