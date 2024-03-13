const profTemplate = require('../handlebars/profilepage.handlebars');

const { fetchProfileData } = require('./fetchprofiledata.js');

function getProfPage(username) {
    fetchProfileData(username)
        .then((data) => {
            const html = profTemplate(data);
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
