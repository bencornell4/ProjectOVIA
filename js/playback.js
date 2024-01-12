//get all clips
function loadVideos() {
    let clips = document.querySelectorAll("video");
    clips.forEach(function(clip) {
        //if clip is 80% in frame play, else pause
        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    clip.play();
                } else {
                    clip.pause();
                    clip.currentTime = 0;
                }
            },
            { threshold: 1, rootMargin: "-50px" }
        );
        observer.observe(clip);
        //click video to mute
        clip.addEventListener("click", () => {
            for (let i = 0; i < clips.length; i++)
            {
                clips[i].muted = !clips[i].muted;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", loadVideos);
document.addEventListener("updateVideos", loadVideos);