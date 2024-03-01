const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./registeruser');
const loginRouter = require('./loginuser');
const confirmUser = require('./confirmuser');
const getProf = require('./getprofiledata');
const uploadVideo = require('./uploadvideo');
const getChunkFeed = require('./getchunk');
const cors = require("cors");

//middleware set up
app.use(cors());
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/confirmuser', confirmUser);
app.use('/api/profiles', getProf);
app.use('/api/video/upload', uploadVideo);
app.use('/api/video/getchunk', getChunkFeed);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});