const { reqUser } = require("../utils/requser.js");

const uploadOpen = document.querySelectorAll('button[name="upload-open"]')
const overlay = document.getElementById('upload-overlay');

document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    //get spinner
    const spinnerOverlay = document.getElementById('spinner-overlay');
    spinnerOverlay.style.display = 'flex';
    overlay.style.display = "none";
    //get upload data
    const formData = new FormData();
    const username = reqUser();
    formData.append('username', username);
    const captionInput = document.getElementById("caption-input").value;
    formData.append('videoDescription', captionInput);
    var videoInput = document.getElementById("video-input").files[0];
    formData.append('videoFile', videoInput, videoInput.name);
    //send upload to back end
    fetch(event.target.action, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then((response) => {
        //hide spinner
        spinnerOverlay.display = 'none';
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json();
    }).then((body) => {
        if (body) {
            //announce updated videos for playback
            updateVideos = new CustomEvent("updateVideosMain");
            document.dispatchEvent(updateVideosMain);
            //close and reset upload form
            document.getElementById("uploadForm").style.display = "none";
            document.getElementById("uploadForm").reset();
            //announce feed reload
            location.reload(); //temp
        }
    }).catch((error) => {
        console.error('Error uploading video: ', error);
        //display that user doesn't exist? Don't allow redirect?
    });
});

uploadOpen.forEach(element => { 
    element.addEventListener('click', function() {
        document.getElementById("uploadForm").style.display = "block";
        overlay.style.display = "flex";
    });
});

document.getElementById("uploadCancel").addEventListener('click', function() {
    document.getElementById("uploadForm").style.display = "none";
    overlay.style.display = "none";
});