const postTemplate = require('../handlebars/mainfeed__post.handlebars');
const { fetchProfileData } = require('../utils/fetchprofiledata');

var loadingSufficient = false;
var profNotLoading = false;

function completeLoad() {
    if (loadingSufficient && profNotLoading) {
        contentLoadedMain = new CustomEvent("contentLoadedMain");
        document.dispatchEvent(contentLoadedMain);
    } else {
        profNotLoading = true;
    }
}

document.addEventListener("profNotLoading", completeLoad);

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
    }).then(async (body) => {
        if (body.length > 0) {
            var feed = "";
            try {
                for (var i = 0; i < body.length; i++) {
                    feed = feed + await constructPost(body[i]);
                }
                //update html
                document.getElementById("postContainer").innerHTML = feed;
                updateVideosMain = new CustomEvent("updateVideosMain");
                document.dispatchEvent(updateVideosMain);
                //alert sufficient loading
                loadingSufficient = true;
                completeLoad();
            } catch {
                //silent error
                return;
            }
        } else {
            //alert sufficient loading
            loadingSufficient = true;
            completeLoad();
            //cant display feed
        }
    }).catch((error) => {
        console.error("Error: ", error);
    });
}

document.addEventListener("DOMContentLoaded", loadFeedMain);

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