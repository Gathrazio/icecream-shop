const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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

const orderedItemSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    __v: {
        type: Number
    },
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
        type: Schema.Types.Mixed,
        enum: [null, 1, 2, 3, 4, 5],
        required: true
    },
    users: {
        type: [lightweightUserSchema],
        required: true
    }
}, { _id: false, })

const orderSchema = new Schema({
    items: {
       type: [orderedItemSchema],
       required: true
    }
}, { timestamps: true })

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders: {
        type: [orderSchema],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);