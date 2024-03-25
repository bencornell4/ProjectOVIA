const postTemplate = require('../handlebars/mainfeed__post.handlebars');
const { fetchProfileData } = require('../utils/fetchprofiledata');
const { reqUser } = require('../utils/fetchusername.js');

async function loadFeedFollowing() {
    const formData = new FormData();
    const chunkSize = 5;
    const username = await reqUser();
    //only display following if logged in
    if (!username) {
        return;
    }
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
        if (body.length > 0) {
            var feed = "";
            try {
                for (var i = 0; i < body.length; i++) {
                    feed = feed + await constructPost(body[i]);
                }
                //hide empty feed notification
                document.getElementById("feedErrorMain").style.display = "none";
                //update html
                document.getElementById("postContainerFollowing").innerHTML += feed;
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
        //handle quietly
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