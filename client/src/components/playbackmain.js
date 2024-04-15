const { loadFeedMain } = require('./loadfeedmain.js');

//keep track of existing observers
const existingObservers = new Map();

//get all clips
async function loadVideos() {
    let clips = document.querySelectorAll("video");

    // Remove existing observers and listeners
    existingObservers.forEach((observer) => observer.disconnect());
    existingObservers.clear();
    for (const [index, clip] of clips.entries()) {
        //use promises to prevent errors
        try {
            await clip.play();
        } catch (error) {
            console.error("Error playing video:", error);
        }
        //if clip is 80% in frame play, else pause
        const observer = new IntersectionObserver(
            async entries => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    if (index == (clips.length - 1)) {
                        //load 5 more chunks
                        const spinnerOverlay = document.getElementById('spinner-overlay');
                        spinnerOverlay.style.display = 'flex';
                        //get upload date
                        await loadFeedMain(clip.dataset.videoId);
                        spinnerOverlay.style.display = 'none';
                    }
                    clip.play();
                } else {
                    clip.pause();
                    clip.currentTime = 0;
                }
            },
            { root: document.querySelector('.scroll-container'), rootMargin:"0px", threshold: 1}
        );
        observer.observe(clip);
        //add to existing observers set for clearing
        existingObservers.set(clip, observer);
        //click video to mute
        clip.addEventListener("click", () => {
            for (let i = 0; i < clips.length; i++)
            {
                clips[i].muted = !clips[i].muted;
            }
        });
    }
}

document.addEventListener("updateVideosMain", loadVideos);