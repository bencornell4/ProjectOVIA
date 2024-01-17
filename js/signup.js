document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    closeSignUp();
});

function openSignup() {
    document.getElementById("signupForm").style.display = "block";
}

function closeSignup() {
    document.getElementById("signupForm").style.display = "none";
}