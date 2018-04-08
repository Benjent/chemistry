const express = require('express')
const app = express()
const db = require('./database.js');
const bodyParser = require('body-parser')

// POST handler
app.use(bodyParser.urlencoded({extended: true}))

app.post('/editProfile', (req, res) => {
    db.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log(req.body, 'saved to database')
        res.redirect('/')
      })
})

app.post('/signUp', (req, res) => {
    db.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log(req.body, 'saved to database')
        res.redirect('/')
      })
})

// module.exports = app