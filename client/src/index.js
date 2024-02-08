//imports

//templates
const templates = require('./handlebars/templates.js');

//components
const popstate = require('./components/popstate.js');
const login = require('./components/login.js');
const playback = require('./components/playback.js');
const populatestats = require('./components/populatestats.js');
const signup = require('./components/signup.js');
const upload = require('./components/upload.js');
const profilebutton = require('./components/profilebutton.js');

//utils
const gamedata = require('./utils/gamedata.js');
const populateprofile = require('./utils/populateprofile.js');

//exports
module.exports = {popstate, templates, login, playback, populatestats, signup, upload, profilebutton, gamedata, populateprofile};