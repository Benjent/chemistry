const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    // TODO
    let data = {}
    res.render('index', data);
})

module.exports = router