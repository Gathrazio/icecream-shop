const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderedItemSchema = new Schema({
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
        enum: [null, 1, 2, 3, 4, 5],
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
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);