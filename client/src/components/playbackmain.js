const { loadFeedMain } = require('./loadfeedmain.js');

const viewportCenter = window.scrollY + window.innerHeight / 2;
var activeVideo = null;
var activeDistance = Infinity;
var clips = null;
var lastClip = null;

async function loadVideos() {
    clips = document.querySelectorAll("video");

    clips.forEach(async (clip, index) => {
        //hide video spinners when loaded
        clip.addEventListener("loadeddata", async (index) => {
            const spinner = document.getElementById(`spinner${clip.dataset.videoId}`);
            spinner.style.display = "none";
            if (index == 0) {
                try {
                    await clip.play();
                } catch (error) {
                    return;
                }
            } 
        });
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
            if (index == (clips.length - 1) && clip.dataset.videoId != lastClip) {
                //monitor last checked clip
                lastClip = clip.dataset.videoId;
                //load 5 more chunks
                const spinnerOverlay = document.getElementById('spinner-overlay');
                spinnerOverlay.style.display = 'flex';
                await loadFeedMain(clip.dataset.videoId);
                spinnerOverlay.style.display = 'none';
            }
            if (activeVideo && clip != activeVideo) {
                activeVideo.pause();
            }
            activeDistance = videoDistance;
            activeVideo = clip;
            if (clip.paused) {
                try {
                    await clip.play();
                } catch (error) {
                    return;
                }
            }
        } else {
            clip.pause();
            clip.currentTime = 0;
        }
    });
}

window.addEventListener('scroll', playVideos);
document.addEventListener("updateVideosMain", loadVideos);