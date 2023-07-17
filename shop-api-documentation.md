Overview

This shop API allows the frontend app to make various database queries, including CRUD operations for the users and items collections and other unique operations.

Database Collections

There are two collections this API deals with: a users collection (a collection of users of the app) and a food items collection (a collection of all of the food items the shop sells).

User

A `user` document contains a `firstName`, `lastName`, `username`, `password`, and `orders` property. The `orders` property is an array containing sub-documents which are `order` objects. Each `order` sub-document has an `items` property which is itself an array of `ordered items` sub-sub-documents. Each `ordered item` is itself an object with properties being `itemID`, `quantity`, and `rating`. Note that the `ordered items` sub-sub-documents do not have an `_id` property, but the `order` sub-document does. This is because an `ordered item` already contains an id (namely `itemID`) which is transfered from the `_id` property of an item document of the items collection, but each new `order` requires a new ID to be generated. The schemas of the `user` document, the `order` sub-document, and the `orderedItem` sub-sub-document are below.

```js
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
}, { _id: false })

const orderSchema = new Schema({
    items: {
       type: [orderedItemSchema],
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

```