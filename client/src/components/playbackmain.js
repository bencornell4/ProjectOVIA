const { loadFeedMain } = require('./loadfeedmain.js');

const viewportCenter = window.scrollY + window.innerHeight / 2;
var activeVideo = null;
var activeDistance = Infinity;
var clips = null;
var feedEmpty = false;

//get all clips
async function loadVideos() {
    clips = document.querySelectorAll("video");

    clips.forEach(async (clip, index) => {
        //click video to mute
        clip.addEventListener("click", () => {
            for (let i = 0; i < clips.length; i++)
            {
                clips[i].muted = !clips[i].muted;
            }
        });
    });
}

async function playVideos() {
    clips.forEach(async (clip, index) => {
        //if clip is 80% in frame play, else pause
        const videoRect = clip.getBoundingClientRect();
        const videoCenter = videoRect.top + videoRect.height / 2;
        const videoDistance = Math.abs(viewportCenter - videoCenter);
        if (videoDistance < activeDistance || clip === activeVideo) {
            if (index == (clips.length - 1) && !feedEmpty) {
                //load 5 more chunks
                const spinnerOverlay = document.getElementById('spinner-overlay');
                spinnerOverlay.style.display = 'flex';
                //get upload date
                feedEmpty = false;
                const feedLoaded = await loadFeedMain(clip.dataset.videoId);
                feedEmpty = feedLoaded;
                spinnerOverlay.style.display = 'none';
            }
            if (activeVideo) {
                activeVideo.pause();
            }
            activeDistance = videoDistance;
            activeVideo = clip;
            try {
                await clip.play();
            } catch (error) {
                return;
            }
        } else {
            clip.pause();
            clip.currentTime = 0;
        }
    });
}

window.addEventListener('scroll', playVideos);
document.addEventListener("updateVideosMain", loadVideos);