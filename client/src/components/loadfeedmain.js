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

async function loadFeedMain(lastUploadDate) {
    const formData = new FormData();
    const chunkSize = 5;
    formData.append('chunkSize', chunkSize);
    formData.append('lastUploadDate', lastUploadDate);
    const apiUrl = BASE_URL + '/api/video/getchunk/main';
    return fetch(apiUrl, {
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
                    feed += await constructPost(body[i]);
                }
                //hide empty feed notification
                document.getElementById("feedErrorMain").style.display = "none";
                //update html
                const feedChunk = document.createElement("section");
                feedChunk.innerHTML = feed;
                (document.getElementById("postsContainer")).appendChild(feedChunk);
                updateVideosMain = new CustomEvent("updateVideosMain");
                document.dispatchEvent(updateVideosMain);
                //alert sufficient loading
                loadingSufficient = true;
                completeLoad();
                return true;
            } catch {
                //silent error
                return;
            }
        } else {
            //alert sufficient loading
            loadingSufficient = true;
            completeLoad();
            //no more feed message
            document.getElementById("feedErrorMain").style.display = "block";
            return false;
        }
    }).catch((error) => {
        console.error("Error: ", error);
    });
}

document.addEventListener("DOMContentLoaded", loadFeedMain(Infinity));

async function constructPost(videoObject) {
    const postData = {
        username: videoObject.username,
        profPic: videoObject.pfp_key,
        video_id: videoObject.video_id,
        description: videoObject.description
    };
    postData.profPic = (await fetchProfileData(postData.username)).profPic;
    const post = postTemplate(postData);
    return post;
}

module.exports = { loadFeedMain };