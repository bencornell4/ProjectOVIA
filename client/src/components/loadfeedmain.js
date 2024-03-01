const Handlebars = require('handlebars');
const postTemplate = Handlebars.templates['mainfeed__post'];

function loadFeedMain() {
    const formData = new FormData();
    const chunkSize = 5;
    formData.append('chunkSize', chunkSize);
    fetch('http://localhost:3000/api/video/getchunk/main', {
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
                feed = feed + constructPost(body[i]);
            }
            document.getElementById("postContainer").innerHTML = feed;
            updateVideosMain = new CustomEvent("updateVideosMain");
            document.dispatchEvent(updateVideosMain);
        } else {
            //can't display feed
        }
    }).catch((error) => {
        console.error("Error: ", error);
    });
}

document.addEventListener("DOMContentLoaded", loadFeedMain);

function constructPost(videoObject) {
    const postData = {
        username: videoObject.username,
        pfp_key: videoObject.pfp_key,
        video_id: videoObject.video_id,
        full_name: videoObject.full_name,
        description: videoObject.description
    };
    const post = postTemplate(postData);
    return post;
}