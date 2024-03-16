//get all clips
async function loadOnHover() {
    let clips = document.querySelectorAll("video");

    clips.forEach(async function(clip) {
        try {
            await clip.play();
            clip.pause();
        } catch (error) {
            console.log("Error playing video:", error);
        }
        //play clip when mouseover
        clip.addEventListener('mouseover', (event) => {
            clip.play();
        });
        //pause and reset clip when mouseout
        clip.addEventListener('mouseout', (event) => {
            clip.pause();
            clip.currentTime = 0;
        });
        //click video to mute and unmute
        clip.addEventListener("click", (event) => {
            for (let i = 0; i < clips.length; i++)
            {
                clips[i].muted = !clips[i].muted;
            }
        });
    });
}

document.addEventListener("profPageOnloadComplete", loadOnHover);