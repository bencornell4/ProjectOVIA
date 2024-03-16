const mainFeed = document.getElementById("postContainer");
const followingFeed = document.getElementById("postContainerFollowing");

document.getElementById("followFeedButton").addEventListener('click', function() {
    followingFeed.style.display = 'block';
    mainFeed.style.display = 'none';
});

document.getElementById("allFeedButton").addEventListener('click', function() {
    mainFeed.style.display = 'block';
    followingFeed.style.display = 'none';
});