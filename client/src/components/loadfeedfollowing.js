const postTemplate = require('../handlebars/mainfeed__post.handlebars');
const { fetchProfileData } = require('../utils/fetchprofiledata');
const { reqUser } = require('../utils/requser');

function loadFeedFollowing() {
    const formData = new FormData();
    const chunkSize = 5;
    const username = reqUser();
    formData.append('username', username);
    formData.append('chunkSize', chunkSize);
    fetch('http://localhost:3000/api/video/getchunk/following', {
        method: 'POST',
        credentials: 'include',
        body: new URLSearchParams(formData)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then(async (body) => {
        if (body) {
            var feed = "";
            try {
                for (var i = 0; i < body.length; i++) {
                    feed = feed + await constructPost(body[i]);
                }
                document.getElementById("postContainerFollowing").innerHTML = feed;
                updateVideosMain = new CustomEvent("updateVideosMain");
                document.dispatchEvent(updateVideosMain);
            } catch {
                //silent error
                return;
            }
        } else {
            //cant display feed
        }
    }).catch((error) => {
        console.error("Error: ", error);
    });
}

document.addEventListener("DOMContentLoaded", loadFeedFollowing);

async function constructPost(videoObject) {
    const postData = {
        username: videoObject.username,
        profPic: videoObject.pfp_key,
        video_id: videoObject.video_id,
        full_name: videoObject.full_name,
        description: videoObject.description
    };
    postData.profPic = (await fetchProfileData(postData.username)).profPic;
    const post = postTemplate(postData);
    return post;
}