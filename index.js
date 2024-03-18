const express = require('express');
const dbconnect = require('./config/dbconnect');
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authrouter = require('./routes/authroutes');
const bodyParser = require('body-parser');
const { notfound, errorhandler } = require('./middlewares/errorhandler');
dbconnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/user', authrouter)
app.use(notfound);
app.use(errorhandler);
app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
});