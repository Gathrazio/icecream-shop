const express = require('express');
const itemsRouter = express.Router();
const FoodItem = require('../models/item.js')

itemsRouter.route('/')
    .get((req, res, next) => { // get all food items
        FoodItem.find((err, foodItems) => {
            if (err) {
                res.status(500)
                return next(err);
            }
            return res.status(200).send(foodItems);
        })
    })
    .post((req, res, next) => { // post one new food item
        const newItem = new FoodItem(req.body);
        newItem.save((err, savedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedItem);
        })
    })

itemsRouter.route('/category/:category')
    .get((req, res, next) => { // get all food items from a category
        FoodItem.find(
            { category: req.params.category },
            (err, foodItems) => {
                if (err) {
                    res.status(500)
                    return next(err);
                }
                return res.status(200).send(foodItems)
            }
        )
    })

itemsRouter.route('/:itemID')
    .delete((req, res, next) => { // delete one food item by its ID
        FoodItem.findOneAndDelete(
            { _id: req.params.itemID },
            (err, deletedItem) => {
                if (err) {
                    res.status(500)
                    return next(new Error("Food item to be deleted has never existed."))
                }
                if (!deletedItem) {
                    res.status(500)
                    return next(new Error ("Food item to be deleted has previously been deleted."))
                }
                return res.status(200).send(`Successfully deleted ${deletedItem.title} from the food item collection.`)
            }
        )
    })
    .get((req, res, next) => { // get one food item by its ID
        FoodItem.findOne(
            { _id: req.params.itemID },
            (err, foodItem) => {
                if (err) {
                    res.status(500)
                    return next(err);
                }
                return res.status(200).send(foodItem);
            }
        )
    })
    .put((req, res, next) => { // update one food item by ID
        FoodItem.findOneAndUpdate(
            { _id: req.params.itemID },
            req.body,
            { new: true },
            (err, updatedFoodItem) => {
                if (err) {
                    res.status(500)
                    return next (new Error("Item to be updated has never existed."))
                }
                if (!updatedFoodItem) {
                    res.status(404)
                    return next(new Error("Item to be updated has previously been deleted."))
                }
                return res.status(201).send(updatedFoodItem);
            }

        )
    })

module.exports = itemsRouter;