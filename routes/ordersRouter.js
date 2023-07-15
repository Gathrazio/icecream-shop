const express = require('express');
const ordersRouter = express.Router();
const FoodItem = require('../models/item.js');
const User = require('../models/user');

ordersRouter.route('/user/:userID')
    .get((req, res, next) => { // get all orders corresponding to a user
        User.findOne(
            { _id: req.params.userID },
            (err, foundUser) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(foundUser.orders);
            }
        )
    })
    .post((req, res, next) => { // post a new order to a user consisting of the user's current cart
        FoodItem.$where(`this.users.findIndex(user => user.userID === ${req.params.userID}) !== -1`).exec((err, usersCartsFoodItems) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            const lightUCFI = usersCartsFoodItems.map(item => ({
                itemID: item._id,
                quantity: item.users.find(user => user.userID === req.params.userID).quantity,
                rating: undefined
            }))
            User.findOneAndUpdate(
                { _id: req.params.userID },
                { $push: { orders: lightUCFI } },
                { new: true },
                (err, updatedUser) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(201).send(updatedUser);
                }
            )
        })
    })

ordersRouter.route('/order/:orderID')
    .get((req, res, next) => { // get order by its order ID
        User.$where(`this.orders.findIndex(order => order._id === ${req.params.orderID}) !== -1`).exec((err, nestedUser) => {
            if (err) {
                res.status(500)
                return next(err);
            }
            const relevantOrder = nestedUser.orders.find(order => order._id === req.params.orderID);
            return res.status(200).send(relevantOrder);
        })
    })

module.exports = ordersRouter;