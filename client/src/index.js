//templates
const templates = require('./handlebars/templates.js');

//components
const states = require('./components/states.js');
const login = require('./components/login.js');
const playbackmain = require('./components/playbackmain.js');
const playbackprofile = require('./components/playbackprofile.js');
const populatestats = require('./components/populatestats.js');
const signup = require('./components/signup.js');
const upload = require('./components/upload.js');
const profilebutton = require('./components/profilebutton.js');
const loadfeedmain = require('./components/loadfeedmain.js');
const loadfeedprofile = require('./components/loadfeedprofile.js');

//utils
const gamedata = require('./utils/gamedata.js');
const populateprofile = require('./utils/populateprofile.js');

//exports
module.exports = {states, templates, login, playbackmain, playbackprofile, populatestats, signup, upload, profilebutton, loadfeedmain, loadfeedprofile, gamedata, populateprofile};