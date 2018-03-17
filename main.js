// Server
const http = require("http");
const port = 8081;

// Framework
const express = require('express')
const app = express()

// Database
const mongo = require('mongodb').MongoClient;

// Template builder
const path = require('path')
const hbs = require('hbs');

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

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log('Example app listening on port ' + port + '! Go to http://127.0.0.1:' + port + '/'))

mongo.connect('mongodb://localhost:27017/chemistry', function(err, database) {
    if (err) {
        throw err;
    }

    const db = database.db("chemistry");
    
    db.collection('user').find().toArray(function(err, result) {
        if (err) {
        throw err;
        }
        console.log(result);
    });
});