const postTemplate = require('../handlebars/profilepage__post.handlebars');

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
            const profPageOnloadComplete = new CustomEvent("profPageOnloadComplete");
            document.dispatchEvent(profPageOnloadComplete);
        } else {
            //can't display profile feed
        }
    }).catch((error) => {
        console.error("Error: ", error);
    });
}

document.addEventListener("profPageOnload", loadFeedProfile);

function constructPost(videoId) {
    const postData = {
        videoId: videoId,
    };
    var post = postTemplate(postData);
    return post;
}