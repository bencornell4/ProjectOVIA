const { loadFeedMain } = require('./loadfeedmain.js');

//keep track of existing observers
const existingObservers = new Map();
var activeVideo = null;
var oldVideo = null;
var lastScrollTop = 0;
var currentScroll = 0;
var oldScroll = 0;

//get all clips
async function loadVideos() {
    let clips = document.querySelectorAll("video");

    // Remove existing observers and listeners
    existingObservers.forEach((observer) => observer.disconnect());
    existingObservers.clear();
    for (const [index, clip] of clips.entries()) {
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
                    if (activeVideo && activeVideo !== clip) {
                        activeVideo.pause();
                        oldVideo = activeVideo;
                    }
                    activeVideo = clip;
                    clip.play();
                } else {
                    clip.pause();
                    clip.currentTime = 0;
                    if (clip == activeVideo) {
                        activeVideo = null;
                    }
                    if (clip == oldVideo) {
                        oldVideo = null;
                    }
                }
            },
            { root: null, rootMargin:"0px", threshold: 0.9}
        );
        observer.observe(clip);
        //add to existing observers set
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

window.addEventListener('scroll', () => {
    //scroll switcher to make sure only one clip plays at a time
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        currentScroll = 1;
        //scrolling down
        if (activeVideo && oldVideo && oldScroll != currentScroll) {
            [activeVideo, oldVideo] = [oldVideo, activeVideo];
            activeVideo.play();
            oldVideo.pause();
        }
        oldScroll = currentScroll;
    } else {
        currentScroll = 0;
        //scrolling up
        if (activeVideo && oldVideo && oldScroll != currentScroll) {
            [activeVideo, oldVideo] = [oldVideo, activeVideo];
            activeVideo.play();
            oldVideo.pause();   
        }
        oldScroll = currentScroll;
    }
    lastScrollTop = scrollTop;
})

document.addEventListener("updateVideosMain", loadVideos);