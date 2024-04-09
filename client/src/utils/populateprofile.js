const profTemplate = require('../handlebars/profilepage.handlebars');

const { fetchProfileData } = require('./fetchprofiledata.js');

function getProfPage(username) {
    fetchProfileData(username)
        .then((data) => {
            console.log(data.profPic)
            const html = profTemplate(data);
            document.body.innerHTML = html;
            //profile loaded
            profPageOnload = new CustomEvent("profPageOnload");
            document.dispatchEvent(profPageOnload);
        })
        .catch((error) => {
            console.error('Error getting profile data: ', error);
        });
}

module.exports = { getProfPage };
