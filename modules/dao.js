const express = require('express')
const app = express()
const db = require('./database.js');
const models = require('./models.js');

let testdata = new models.user({
    userName: "admin",
    email: "test@test.fr",
    password: "test123",
    birthDate: "10/03/1995",
    location: 21,
    instruments: ["Guitar", "Drums"],
    description: "I am the creator of this app"
});

testdata.save(function(err, data){
    if(err) console.log(error);
    else console.log ('Success:' , data);
});

function getAllUsers() {
    User.
        find().
        exec(function (err, users) {
            if (err) return handleError(err);
            console.log('Found %s users', users.length);
        });
}

function getUserByUserName(userName) {

    // let foundUser =
    User.
        find().
        where('userName').equals(userName).
        exec(function (err, user) {
            if (err) return handleError(err);
            console.log('Found user is %s', user.userName);
        });
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserByUserName: getUserByUserName
}
