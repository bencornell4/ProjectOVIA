const Handlebars = require('handlebars');
const postTemplate = Handlebars.templates['mainfeed__post'];

function loadFeedProfile() {
    const formData = new FormData();
    const chunkSize = 5;
    const username = window.location.pathname.substring(1);
    formData.append('chunkSize', chunkSize);
    formData.append('username', username);
    fetch(`http://localhost:3000/api/video/getchunk/profile`, {
        method: 'POST',
        body: new URLSearchParams(formData)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((body) => {
        if (body) {
            var feed = "";
            for (var i = 0; i < body.length; i++)
            {
                feed = feed + constructPost(body[i].video_id);
            }
            document.getElementById("profPostContainer").innerHTML = feed;
            updateVideosProfile = new CustomEvent("updateVideosProfile");
            document.dispatchEvent(updateVideosProfile);
        } else {
            //can't display profile feed
        }
    }).catch((error) => {
        console.error("Error: ", error);
    });
}

document.addEventListener("loadProfileVideos", loadFeedProfile);

function constructPost(videoId) {
    const post = `<video class="video-grid__item" id="${videoId}" loop src="https://res.cloudinary.com/dllfvjfoy/video/upload/${videoId}.mp4" width=100%></video>`;
    return post;
}