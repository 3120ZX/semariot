const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const postData = require('./routes/data');
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
    console.log('connected to DB!')
);

mongoose.connection.on('error', err => {
    console.log(err);
})

//Middleware
app.use(express.json());
//Route Middlewares
app.options('*', cors());
app.use('/api/telemetry', postData);

app.listen(3000, () => console.log('Server up and running'));