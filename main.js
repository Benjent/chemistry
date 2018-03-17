// Requirements
const http = require("http");
const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('mongodb').MongoClient;
const path = require('path')
const hbs = require('hbs');

// App setup
const app = express()
const port = 8081;
var db = null;

// Routers
const mainRouter = require('./routers/main')
// const authRouter = require('./routers/nomDeMaPage.hbs')
// TODO make a rooter for mongodb

// Routes
app.use('/', mainRouter)
// app.use('/nomDePage', userRouter)

// Views
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.use(express.static(path.join(__dirname, '/assets/public')))

// POST handler
app.use(bodyParser.urlencoded({extended: true}))

// App
// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log('Example app listening on port ' + port + '! Go to http://127.0.0.1:' + port + '/'))

// Database
mongo.connect('mongodb://localhost:27017/chemistry', function(err, client) {
    if (err) {
        throw err;
    }

    db = client.db("chemistry");

    db.collection('users').insertOne(
        {
            firstName: "Benjamin",
            birthDate: 23
        }
    )
    // db.myNewCollection3.createIndex( { y: 1 } )

    db.collection('users').find().toArray(function(err, result) {
        if (err) {
        throw err;
        }
        console.log(result);
    });
});

app.post('/signUp', (req, res) => {
    db.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.redirect('/')
      })
})