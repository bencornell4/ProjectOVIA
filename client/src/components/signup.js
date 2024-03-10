const signupOpen = document.querySelectorAll('button[name="signup-open"]')

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    fetch(event.target.action, {
        credentials: 'include',
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target))
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((body) => {
        if (body) {
            //set profile pic
            fetchProfileData(reqUser())
                .then((data) => {
                    document.getElementById("profileButton").firstChild.firstChild.src = data.profPic;
                });
            //update ui elements
            //document.getElementById("signupErrorMessage").style.display = "none";
            document.getElementById("signupForm").style.display = "none";
            document.getElementById("loginButton").style.display = "none";
            document.getElementById("profileButton").style.display = "inline-block";
            document.getElementById("uploadButton").style.display = "inline-block";
        } else {
            //display signup error
        }
    }).catch((error) => {
        console.error("Error signing up: ", error);
    });
});

signupOpen.forEach(element => { element.addEventListener('click', function() {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("loginErrorMessage").style.display = "none";
    });
});

document.getElementById("signupCancel").addEventListener('click', function() {
    document.getElementById("signupForm").style.display = "none";
});