const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const lightweightItemSchema = new Schema({
    itemID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: [lightweightItemSchema],
        required: true
    }
})

module.exports = mongoose.model("Order", orderSchema);