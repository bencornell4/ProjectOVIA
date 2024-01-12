document.getElementById("uploadForm").addEventListener("submit", function(event) {

    event.preventDefault();

    var videoInput = document.getElementById("video-input").files[0],
        captionInput = document.getElementById("caption-input").value;

    var post = document.createElement("section");
    //prof pic
    var pfpDiv = document.createElement("div");
    pfpDiv.className = "post";
    var pfpButton = document.createElement("button");
    var pfpImg = document.createElement("img");
    pfpImg.src = "imgs/benprof.jpg";
    pfpImg.alt = "author-pfp";
    pfpImg.onmouseover = function(e){populateStats(e)};
    pfpImg.onmouseout = function(){depopulateStats()};
    pfpButton.append(pfpImg);
    pfpDiv.appendChild(pfpButton);
    post.appendChild(pfpDiv);
    //content
    var contentDiv = document.createElement("div");
    contentDiv.className = "post content primary font";
    //author
    var authorDiv = document.createElement("div");
    authorDiv.className = "author";
    var userUsername = document.createElement("h3");
    userUsername.className = "author-name";
    userUsername.textContent = "bencornell44";
    var userName = document.createElement("h4");
    userName.className = "author-name";
    userName.textContent = "Ben Cornell";
    authorDiv.appendChild(userUsername);
    authorDiv.appendChild(userName);
    contentDiv.appendChild(authorDiv);
    //description
    var descriptionDiv = document.createElement("div");
    descriptionDiv.className = "description";
    var descriptionContent = document.createElement("p");
    descriptionContent.textContent = captionInput;
    descriptionDiv.appendChild(descriptionContent);
    contentDiv.appendChild(descriptionDiv);
    //video
    var videoElement = document.createElement("video");
    videoElement.loop = true;
    videoElement.src = URL.createObjectURL(videoInput);
    videoElement.width = 400;
    contentDiv.appendChild(videoElement);
    
    post.appendChild(contentDiv);

    var lineBreak = document.createElement("hr");
    lineBreak.className = "solid";
    post.appendChild(lineBreak);
    document.getElementById("postContainer").prepend(post);
    document.getElementById("uploadForm").reset();
    closeForm();

    //announce updated videos for playback
    updateVideos = new CustomEvent("updateVideos");
    document.dispatchEvent(updateVideos);
});

function openForm() {
    document.getElementById("uploadForm").style.display = "block";
}

function closeForm() {
    document.getElementById("uploadForm").style.display = "none";
}