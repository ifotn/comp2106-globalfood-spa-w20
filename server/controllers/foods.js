var express = require('express')
var router = express.Router()

var mongoose = require('mongoose')
var Food = require('../models/food')

var config = require('../../config/globals')

// allow controller to accept cross-origin requests from localhost:4200
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.clientServer)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
})

// GET: /foods
router.get('/', (req, res, next) => {
    // get list of all foods and return a json response
    Food.find((err, foods) => {
        if (err) {
            console.log(err)
            return res.json(err).status(400)
        }
        else {
            return res.json(foods).status(200) // 200: OK
        }
    })
})

// POST: /foods
router.post('/', (req, res, next) => {
    // use the Food model to save the new food
    Food.create(req.body, (err, newFood) => {
        if (err) {
            console.log(err)
            return res.json(err).status(501);
        }
        else {
            return res.json(newFood).status(201); // 201: Created
        }
    })
})

// DELETE: /foods/abc123
router.delete('/:_id', (req, res, next) => {
    Food.remove({ _id: req.params._id }, (err, food) => {
        if (err) {
            console.log(err)
            return res.json(err).status(501)
        }
        else {
            return res.json(food).status(204) // 204: No Content
        }
    })
})

// PUT: /foods/abc123
router.put('/:_id', (req, res, next) => {
    Food.update({ _id: req.params._id },
        {
            $set: {
                name: req.body.name,
                country: req.body.country
            }
        }, null, (err, food) => {
        if (err) {
            console.log(err)
            return res.json(err).status(501)
        }
        else {
            return res.json(food).status(200) // 202: Accepted
        }
    })
})

// make this controller public
module.exports = router
