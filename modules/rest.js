const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dao = require('./dao.js')

// POST handler
app.use(bodyParser.urlencoded({extended: true}))

app.post('/signUp', (req, res) => {

    let data = {}

    console.log('grosse merde')
    console.log(dao.getUserByUserName("benjent"))

    // db.collection('users').findOne({userName: req.body.userName}, function(err, result) {
    //     if (err) throw err;

    //     if(result) {
    //         console.log(req.body.userName, 'userName already taken')
    //         data.message = "userName already taken";
    //         data.users = db.collection('users').find();
    //         res.render('index', data);
    //     } else {
    //         db.collection('users').save(req.body, (err, result) => {
    //             if (err) return console.log(err)
    //             data.message = "successfully signed up"
    //             console.log(req.body, 'signUp saved to database')
    //             res.render('index', data);
    //         })
    //     }
    // })
    
})

app.post('/signIn', (req, res) => {
    
    var data = {}

    db.collection('users').findOne({userName: req.body.userName, password: req.body.password}, function(err, result) {
        if (err) throw err;

        if(result) {
            console.log(req.body.userName, 'successfully signed in')
            // data.message = "Successfully signed in"
            data.userName       = req.body.userName,
            data.email          = req.body.email,
            data.birthDate      = req.body.birthDate,
            data.location       = req.body.location,
            data.instruments    = req.body.instruments,
            data.description    = req.body.description,
            data.users          = []
            // db.collection('users').find().forEach(function(item){
            //     data.users.push(item);
            //     console.log(item)
            // });

            db.collection('users').find(function(err, result) {
                if (err) throw err;

                if(result) {
                    // data.users = []
                    console.log("rerere", result.toArray()) 
                    
                    res.render('index', data);
                }
            });
        } else {
            console.log(req.body, 'username or password missmatch')
            data.message = "Username or password missmatch"
            res.render('index', data);
        }
    })
})

app.post('/editProfile', (req, res) => {
    var data = {}
    
    db.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log(req.body, 'saved to database')
    })

    res.render('index', data);
})

app.get('/clean', (req, res) => {
    var data = {}
    data.message = "Database flushed"
    // Dev purposes
    db.collection('users').remove({})
    res.render('index', data);
})