const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const lightweightOrderedItemSchema = new Schema({
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
        type: Schema.Types.Mixed,
        enum: [undefined, 1, 2, 3, 4, 5],
        required: true
    }
})

const orderSchema = new Schema({
    items: {
       type: [lightweightOrderedItemSchema],
       required: true
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