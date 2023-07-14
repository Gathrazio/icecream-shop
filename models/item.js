const mongoose = require('mongoose')
const Schema = mongoose.Schema

// lightweight user schema

const lightweightUserSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

// item schema
const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['icecream', 'shakes', 'sandwiches'],
        required: true
    },
    users: {
        type: [lightweightUserSchema],
        required: true
    }
})

module.exports = mongoose.model("FoodItem", itemSchema);