//imports

//components
const login = require('./components/login.js');
const playback = require('./components/playback.js');
const populatestats = require('./components/populatestats.js');
const signup = require('./components/signup.js');
const upload = require('./components/upload.js');

//utils
const gamedata = require('./utils/gamedata.js');

//exports
module.exports = {login, playback, populatestats, signup, upload, gamedata};