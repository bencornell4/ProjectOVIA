const Handlebars = require('handlebars');
const profTemplate = Handlebars.templates['profilepage'];

function getProfPage(username) {
    fetch(`http://localhost:3000/api/profiles/${username}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            return response.json();
        })
        .then((data) => {
            const profileData = {
                username: username,
                profPic: `https://res.cloudinary.com/dllfvjfoy/image/upload/f_auto,q_auto/v1/pfp/${data[0].pfp_key}`,
                userFullName: data[0].full_name,
                userBio: data[0].bio
            };
            const html = profTemplate(profileData);
            document.body.innerHTML = html;
            //load profile videos
            loadProfileVideos = new CustomEvent("loadProfileVideos");
            document.dispatchEvent(loadProfileVideos);
        })
        .catch((error) => {
            console.error('Error getting profile data: ', error);
        });
}

module.exports = { getProfPage };
