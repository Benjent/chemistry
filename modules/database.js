
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
// const bodyParser = require('body-parser')
// const express = require('express')
// const app = express()
const settings = require('./settings')
const models = require('./models')

// let mongoDB = 'mongodb://localhost:27017/chemistry';
let mongoDb = 'mongodb://' + settings.db.host + ':' + settings.db.port + '/' + settings.db.name;
mongoose.connect(mongoDb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDb connection error:'));

db.once('open', function(){
    console.log('Connection to DB successful');
});

module.exports = db


