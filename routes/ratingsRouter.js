const express = require('express');
const ratingsRouter = express.Router();
const FoodItem = require('../models/item.js');
const User = require('../models/user');

ratingsRouter.route('/recalculate/:itemID')
    .put((req, res, next) => { // recalculate the global rating of an item by its ID
        // todo
    })

ratingsRouter.route('/rate/:itemID/:userID/')
    .put((req, res, next) => { // rates an item in a user's cart
        User.findOne({ _id: req.params.userID })
            .then(foundUser => {
                const itemIndex = foundUser.orders[Number(req.query.index)].items.findIndex(item => item.itemID.valueOf() === req.params.itemID);
                const editableUser = {...foundUser};
                editableUser._doc.orders[Number(req.query.index)].items[itemIndex].rating = Number(req.query.rating) === 0 ? null : Number(req.query.rating);
                User.findOneAndUpdate(
                    { _id: req.params.userID },
                    { orders: editableUser._doc.orders },
                    { new: true }
                )
                .then(updatedUser => {
                    return res.status(201).send(updatedUser);
                })
                .catch(err => {
                    res.status(500)
                    return next(new Error("Failed to update the item's rating on the user."))
                })
            })
            .catch(err => {
                res.status(500)
                return next(new Error("Failed to find user."))
            })
            

    })

module.exports = ratingsRouter;