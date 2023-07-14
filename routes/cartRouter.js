const express = require('express');
const cartRouter = express.Router();
const FoodItem = require('../models/item.js')

cartRouter.route('/:userID')
    .get((req, res, next) => { // gets a collection of the unique items in the cart of a user via user's ID
        FoodItem.find(
            { users: { $all: [ { userID: req.params.userID } ] } },
            (err, foodItems) => {
                if (err) {
                    res.status(500)
                    return next(err);
                }
                return res.status(200).send(foodItems)
            }
        )
    })

module.exports = cartRouter;