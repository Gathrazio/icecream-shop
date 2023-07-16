const express = require('express');
const ordersRouter = express.Router();
const FoodItem = require('../models/item.js');
const User = require('../models/user');

ordersRouter.route('/user/:userID')
    .get((req, res, next) => { // get all orders corresponding to a user
        User.findOne({ _id: req.params.userID })
            .then(foundUser => res.status(200).send(foundUser.orders))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })
    .post((req, res, next) => { // post a new order to a user consisting of the user's current cart
        FoodItem.find({ 'users.userID': req.params.userID })
            .then(userCart => {
                const blah = userCart.map(item => ({
                    itemID: item._id,
                    quantity: item.users.find(user => user.userID == req.params.userID).quantity,
                    rating: null
                }));
                console.log(blah)
                User.findOneAndUpdate(
                    { _id: req.params.userID },
                    { $push: { orders: userCart.map(item => ({
                        itemID: item._id,
                        quantity: item.users.find(user => user.userID == req.params.userID).quantity,
                        rating: null
                    })) } },
                    { new: true }
                )
                    .then(updatedUser => res.status(201).send(updatedUser))
                    .catch(err => {
                        res.status(500)
                        return next(new Error("Failed to update user with order."));
                    })
            })
            .catch(err => {
                res.status(500)
                return next(new Error("Failed to find user's cart."));
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