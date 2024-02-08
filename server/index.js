const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./registeruser');
const loginRouter = require('./loginuser');
const getProf = require('./getprofiledata');
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('', getProf);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});