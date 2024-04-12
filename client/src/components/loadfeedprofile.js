const postTemplate = require('../handlebars/profilepage__post.handlebars');

function loadFeedProfile() {
    const formData = new FormData();
    const chunkSize = 5;
    const username = window.location.pathname.substring(1);
    formData.append('chunkSize', chunkSize);
    formData.append('username', username);
    const apiUrl = BASE_URL + '/api/video/getchunk/profile';
    fetch(apiUrl, {
        method: 'POST',
        body: new URLSearchParams(formData)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((body) => {
        contentLoadedProfile = new CustomEvent("contentLoadedProfile");
        document.dispatchEvent(contentLoadedProfile);
        if (body.length > 0) {
            var feed = "";
            for (var i = 0; i < body.length; i++)
            {
                feed = feed + constructPost(body[i].video_id);
            }
            document.getElementById("profPostContainer").innerHTML = feed;
            //page is sufficiently loaded
            const profPageOnloadComplete = new CustomEvent("profPageOnloadComplete");
            document.dispatchEvent(profPageOnloadComplete);
        } else {
            //page is sufficiently loaded
            const profPageOnloadComplete = new CustomEvent("profPageOnloadComplete");
            document.dispatchEvent(profPageOnloadComplete);
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