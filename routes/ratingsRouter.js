const express = require('express');
const ratingsRouter = express.Router();
const FoodItem = require('../models/item.js');
const User = require('../models/user');

ratingsRouter.route('/recalculate/:itemID')
    .get((req, res, next) => { // recalculates the global rating of an item by its ID and returns the new global rating
        User.find()
            .then(users => {
                let totalRating = 0;
                let ratingTally = 0;
                for (i = 0; i < users.length; i++) {
                    for (j = 0; j < users[i].orders.length; j++) {
                        for (k = 0; k < users[i].orders[j].items.length; k++) {
                            if (users[i].orders[j].items[k].rating && users[i].orders[j].items[k].itemID.valueOf() === req.params.itemID) {
                                totalRating += users[i].orders[j].items[k].rating;
                                ratingTally += 1;
                            }
                        }
                    }
                }
                return res.status(200).send(JSON.stringify({
                    globalRating: Math.round(totalRating / ratingTally)
                }))
            })
            .catch(err => {
                res.status(500)
                return next(new Error("Failed to obtain the collection of users."))
            })
    })

ratingsRouter.route('/update/:itemID')
    .put((req, res ,next) => { // updates the global rating of an item to whatever the 'global' query is
        FoodItem.findOneAndUpdate(
            { _id: req.params.itemID },
            { globalRating: Number(req.query.global) === 0 ? null : Number(req.query.global)},
            { new: true }
        )
        .then(updatedItem => res.status(201).send(updatedItem))
        .catch(err => {
            res.status(500)
            return next(new Error("Failed to update the item with a new global rating."))
        })
    })

ratingsRouter.route('/rate/:itemID')
    .put((req, res, next) => { // rates an item in a user's cart
        User.findOne({ _id: req.auth._id })
            .then(foundUser => {
                const itemIndex = foundUser.orders[Number(req.query.index)].items.findIndex(item => item.itemID.valueOf() === req.params.itemID);
                const editableUser = {...foundUser};
                editableUser._doc.orders[Number(req.query.index)].items[itemIndex].rating = Number(req.query.rating) === 0 ? null : Number(req.query.rating);
                User.findOneAndUpdate(
                    { _id: req.auth._id },
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