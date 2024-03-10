const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRouter = require('./auth');
const confirmUser = require('./confirmuser');
const getProf = require('./getprofiledata');
const uploadVideo = require('./uploadvideo');
const getChunkFeed = require('./getchunk');
const assetsRouter = require('./assets');

//middleware set up
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true,
}));
app.use(fileUpload());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/confirmuser', confirmUser);
app.use('/api/profiles', getProf);
app.use('/api/video/upload', uploadVideo);
app.use('/api/video/getchunk', getChunkFeed);
app.use('/api/assets/', assetsRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});