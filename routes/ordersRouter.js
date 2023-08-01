const express = require('express');
const ordersRouter = express.Router();
const FoodItem = require('../models/item.js');
const User = require('../models/user');

ordersRouter.route('/user/')
    .get((req, res, next) => { // get all orders corresponding to a user
        User.findOne({ _id: req.auth._id })
            .then(foundUser => res.status(200).send(foundUser.orders))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })
    .post((req, res, next) => { // post a new order to a user consisting of the user's current cart and, if successful, clears the user's cart of items
        FoodItem.find({ 'users.userID': req.auth._id })
            .then(userCart => {
                User.findOneAndUpdate(
                    { _id: req.auth._id },
                    { $push: { orders: { items: userCart } } },
                    { new: true }
                )
                    .then(updatedUser => {
                        const toggle = [true];
                        const cartSieve = [...userCart];
                        for (i = 0; i < userCart.length; i++) {
                            cartSieve[i].users.splice(cartSieve[i].users.indexOf(user => user.userID === req.auth._id), 1)
                            FoodItem.findOneAndUpdate( // clearing user's cart
                                { 'users.userID': req.auth._id },
                                { users: cartSieve[i].users },
                                { new: true }
                            )
                            .then(updatedItem => {
                                if (toggle[0]) { // to avoid sending multiple responses
                                    toggle[0] = false;
                                    return res.status(201).send(userCart)
                                }
                            })
                            .catch(err => {
                                res.status(500)
                                return next(new Error("Failed to clean up"));
                            })
                        }
                    })
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
        User.findOne({ 'orders._id': req.params.orderID })
            .then(foundUser => {
                const order = foundUser.orders.find(order => order._id == req.params.orderID);
                return res.status(200).send(order);
            })
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })

module.exports = ordersRouter;