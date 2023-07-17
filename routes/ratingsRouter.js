const express = require('express');
const ratingsRouter = express.Router();
const FoodItem = require('../models/item.js');
const User = require('../models/user');

ratingsRouter.route('/recalculate/:itemID')
    .put((req, res, next) => { // recalculate the global rating of an item by its ID
        // todo
    })

module.exports = ratingsRouter;