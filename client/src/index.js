//components
const states = require('./components/states.js');
const login = require('./components/login.js');
const playbackmain = require('./components/playbackmain.js');
const playbackprofile = require('./components/playbackprofile.js');
const populatestats = require('./components/populatestats.js');
const signup = require('./components/signup.js');
const signout = require('./components/signout.js');
const fetchupload = require('./components/fetchupload.js');
const profilebutton = require('./components/profilebutton.js');
const feedbutton = require('./components/feedbutton.js');
const loadfeedmain = require('./components/loadfeedmain.js');
const loadfeedfollowing = require('./components/loadfeedfollowing.js');
const loadfeedprofile = require('./components/loadfeedprofile.js');
const profileedit = require('./components/profileedit.js');

//utils
const fetchprofiledata = require('./utils/fetchprofiledata.js');
const fetchgamedata = require('./utils/fetchgamedata.js');
const populateprofile = require('./utils/populateprofile.js');
const fetchusername = require('./utils/fetchusername.js');

//exports
module.exports = {
    //components
    states, login, playbackmain, 
    playbackprofile, populatestats, 
    signup, signout, fetchupload, 
    profilebutton, feedbutton,
    loadfeedmain, loadfeedfollowing, 
    loadfeedprofile, profileedit,
    //utils
    fetchprofiledata, fetchgamedata, 
    populateprofile, fetchusername,
};