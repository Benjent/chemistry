
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost:27017/chemistry');
let db = mongoose.connection;

db.on('error', function(err){
    console.log('connection error', err);
});

db.once('open', function(){
    console.log('Connection to DB successful');
});

module.exports = db



// let testdata = new User({
//     userName: "admin",
//     password: "test123",
//     birthDate: "10/03/1995",
//     location: 21,
//     instruments: ["Guitar", "Drums"],
//     description: "I am the creator of this app"
// });

// testdata.save(function(err, data){
//     if(err) console.log(error);
//     else console.log ('Success:' , data);
// });



