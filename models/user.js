const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    itemID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }, 
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
})

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
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
})

module.exports = mongoose.model("User", userSchema);