// Requirements
const http = require("http");
const express = require('express')
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('hbs');

var context = {};
context.settings = require('./modules/settings');


// App setup
const app = express()
// const port = 8081;

// Routers
const mainRouter = require('./routers/main')
// const authRouter = require('./routers/nomDeMaPage.hbs')

// Routes
app.use('/', mainRouter)
// app.use('/nomDePage', userRouter)

// Views
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.use(express.static(path.join(__dirname, '/assets/public')))

const db = require('./modules/database')
// const models = require('./modules/models')
// const controllers = require('./modules/controllers')


// Mongoose but dont use

// let Schema = mongoose.Schema;

// let userSchema = new Schema({
//     userName: {
//         type:String,
//         validate: {
//             validator: function(v, cb) {
//                 // User.find({name: v}, function(err,docs){
//                 //     cb(docs.length == 0);
//                 // });
//             },
//             message: 'User already exists!'
//         }
//     },
//     email:String,
//     password:String,
//     birthDate:Date,
//     location:Number,
//     instruments:[String],
//     description:String
// });

// userSchema.pre('save', function(next){
//     let user = this;
//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//         if(err) return next(err);

//         bcrypt.hash(user.password, salt, function(err, hash){
//             if(err) return next(err);

//             user.password = hash;
//             next();
//         });
//     });

// });

// App
// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(context.settings.http.port, () => console.log('Example app listening on port ' + context.settings.http.port + '! Go to http://127.0.0.1:' + context.settings.http.port + '/'))


// TODO move this in rest.js :
const dao = require('./modules/dao.js')

// POST handler
app.use(bodyParser.urlencoded({extended: true}))

app.post('/signUp', (req, res) => {

    let data = {}

    let userName = req.body.userName

    console.log(userName)
    dao.getUserByUserName(function(err, userName){ 
        if(err) return res.send(err);       
        res.user = data;
        console.log('grosse merde')
        console.log(data)
    });

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