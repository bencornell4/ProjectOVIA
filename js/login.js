document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    closeSignUp();
});

function openLogin() {
    document.getElementById("loginForm").style.display = "block";
}

function closeLogin() {
    document.getElementById("loginForm").style.display = "none";
}