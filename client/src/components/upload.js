const { reqUser } = require("../utils/requser.js");

const uploadOpen = document.querySelectorAll('button[name="upload-open"]')

document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
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
        body: formData,
    }).then((response) => {
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

uploadOpen.forEach(element => { element.addEventListener('click', function() {
    document.getElementById("uploadForm").style.display = "block";
    });
});

document.getElementById("uploadCancel").addEventListener('click', function() {
    document.getElementById("uploadForm").style.display = "none";
});