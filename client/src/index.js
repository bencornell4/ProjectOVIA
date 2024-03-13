//components
const states = require('./components/states.js');
const login = require('./components/login.js');
const playbackmain = require('./components/playbackmain.js');
const playbackprofile = require('./components/playbackprofile.js');
const populatestats = require('./components/populatestats.js');
const signup = require('./components/signup.js');
const fetchupload = require('./components/fetchupload.js');
const profilebutton = require('./components/profilebutton.js');
const loadfeedmain = require('./components/loadfeedmain.js');
const loadfeedprofile = require('./components/loadfeedprofile.js');
const profileedit = require('./components/profileedit.js');

//utils
const fetchprofiledata = require('./utils/fetchprofiledata.js');
const gamedata = require('./utils/gamedata.js');
const populateprofile = require('./utils/populateprofile.js');
const requser = require('./utils/requser.js');

//exports
module.exports = {
    //components
    states, login, 
    playbackmain, playbackprofile, populatestats, 
    signup, fetchupload, profilebutton, 
    loadfeedmain, loadfeedprofile, profileedit,
    //utils
    fetchprofiledata, gamedata, populateprofile, 
    requser,
};