var express = require('express')
var router = express.Router()

var mongoose = require('mongoose')
var Food = require('../models/food')

// GET: /foods
router.get('/', (req, res, next) => {
    // get list of all foods and return a json response
    Food.find((err, foods) => {
        if (err) {
            console.log(err)
            return res.json(err).status(400)
        }
        else {
            return res.json(foods).status(200)
        }
    })
})


// make this controller public
module.exports = router
