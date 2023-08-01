const express = require('express');
const cartRouter = express.Router();
const FoodItem = require('../models/item.js')

cartRouter.route('/')
    .get((req, res, next) => { // gets a collection of the unique items in the cart of a user via user's ID
        FoodItem.find({ 'users.userID': req.auth._id })
            .then(userCart => res.status(200).send(userCart))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })

module.exports = cartRouter;