const express = require('express');
const cartRouter = express.Router();
const FoodItem = require('../models/item.js')

// cartRouter.route('/:userID')
//     .get((req, res, next) => { // gets a collection of the unique items in the cart of a user via user's ID
//         FoodItem.$where(`this.users.findIndex(user => user.userID === ${req.params.userID}) !== -1`).exec()
//             .then(userCart => res.status(200).send(userCart))
//             .catch(err => {
//                 res.status(500)
//                 return next(err);
//             })
//     })

cartRouter.route('/:userID')
    .get((req, res, next) => { // gets a collection of the unique items in the cart of a user via user's ID
        FoodItem.find({ 'users.userID': req.params.userID })
            .then(userCart => res.status(200).send(userCart))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })

module.exports = cartRouter;