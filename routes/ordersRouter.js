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
    .post((req, res, next) => { // post a new order to a user consisting of the user's current cart and, if successful, clears the user's cart of items
        FoodItem.find({ 'users.userID': req.params.userID })
            .then(userCart => {
                const formattedCart = userCart.map(item => ({
                    itemID: item._id,
                    quantity: item.users.find(user => user.userID == req.params.userID).quantity,
                    rating: null
                }));
                User.findOneAndUpdate(
                    { _id: req.params.userID },
                    { $push: { orders: { items: formattedCart } } },
                    { new: true }
                )
                    .then(updatedUser => {
                        const toggle = [true];
                        const cartSieve = [...userCart];
                        for (i = 0; i < userCart.length; i++) {
                            cartSieve[i].users.splice(cartSieve[i].users.indexOf(user => user.userID === req.params.userID), 1)
                            FoodItem.findOneAndUpdate( // clearing user's cart
                                { 'users.userID': req.params.userID },
                                { users: cartSieve[i].users },
                                { new: true }
                            )
                            .then(updatedItem => {
                                if (toggle[0]) { // to avoid sending multiple responses
                                    toggle[0] = false;
                                    return res.status(201).send("Successfully posted the order and cleared the user's cart!")
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