const express = require('express');
const itemsRouter = express.Router();
const FoodItem = require('../models/item.js')

itemsRouter.route('/')
    .get((req, res, next) => { // get all food items
        FoodItem.find()
            .then(foodItems => res.status(200).send(foodItems))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })
    .post((req, res, next) => { // post one new food item
        const newItem = new FoodItem(req.body);
        newItem.save()
            .then(savedItem => res.status(201).send(savedItem))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })

itemsRouter.route('/category/:category')
    .get((req, res, next) => { // get all food items from a category
        FoodItem.find({ category: req.params.category })
            .then(foodItems => res.status(200).send(foodItems))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })

itemsRouter.route('/:itemID')
    .delete((req, res, next) => { // delete one food item by its ID
        FoodItem.findOneAndDelete({ _id: req.params.itemID })
            .then(deletedItem => {
                if (!deletedItem) {
                    res.status(500)
                    return next(new Error ("Food item to be deleted has previously been deleted."))
                }
                return res.status(200).send(`Successfully deleted ${deletedItem.title} from the food item collection.`)
            })
            .catch(err => {
                res.status(500)
                return next(new Error("Food item to be deleted has never existed."))
            })
    })
    .get((req, res, next) => { // get one food item by its ID
        console.log(req.params)
        FoodItem.findOne({ _id: req.params.itemID })
            .then(item => res.status(200).send(item))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })
    .put((req, res, next) => { // update one food item by ID
        FoodItem.findOneAndUpdate(
            { _id: req.params.itemID },
            req.body,
            { new: true }
        )
        .then(updatedItem => {
            if (!updatedItem) {
                res.status(404)
                return next(new Error("Item to be updated has previously been deleted."))
            }
            return res.status(201).send(updatedItem);
        })
        .catch(err => {
            res.status(500)
            return next(new Error("Item to be updated has never existed."))
        })
    })

module.exports = itemsRouter;