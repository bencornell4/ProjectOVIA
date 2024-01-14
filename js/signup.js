document.getElementById("signUpForm").addEventListener("submit", function(event) {
    event.preventDefault();
    closeSignUp();
});

function openSignUp() {
    document.getElementById("signUpForm").style.display = "block";
}

function closeSignUp() {
    document.getElementById("signUpForm").style.display = "none";
}