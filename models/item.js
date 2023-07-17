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
}, { _id: false })

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
    imgUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['icecream', 'shakes', 'sandwiches'],
        required: true
    },
    globalRating: {
        type: Number,
        enum: [null, 1, 2, 3, 4, 5]
    },
    users: {
        type: [lightweightUserSchema],
        required: true
    }
})

module.exports = mongoose.model("FoodItem", itemSchema);