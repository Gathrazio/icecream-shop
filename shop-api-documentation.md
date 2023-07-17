Overview

This shop API allows the frontend app to make various database queries, including CRUD operations for the users and items collections and other unique operations.




Database Collections

There are two collections this API deals with: a users collection (a collection of users of the app) and a food items collection (a collection of all of the food items the shop sells).




User

A `user` document contains a `firstName`, `lastName`, `username`, `password`, and an `orders` property. The `orders` property is an array containing sub-documents which are `order` objects. Each `order` sub-document has an `items` property which is itself an array of ordered items sub-sub-documents. Each `orderedItem` is itself an object with properties being `itemID`, `quantity`, and `rating`. Note that the ordered items sub-sub-documents do not have an `_id` property, but the `order` sub-document does. This is because an `orderedItem` already contains an id (namely `itemID`) which is transfered from the `_id` property of an `item` document of the items collection, but each new `order` requires a new ID to be generated. The schemas of the `user` document, the `order` sub-document, and the `orderedItem` sub-sub-document are below.

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


An example user document is also below:


```js
    {
        "_id": "64b3455f2f4f5a5d7097fb95",
        "firstName": "Nancy",
        "lastName": "Fairway",
        "username": "nancy_pie",
        "password": "rainbows456",
        "orders": [
            {
                "items": [
                    {
                        "itemID": "64b3355a00c2a5e8938e9c37",
                        "quantity": 5,
                        "rating": null
                    },
                    {
                        "itemID": "64b335d900c2a5e8938e9c39",
                        "quantity": 5,
                        "rating": null
                    },
                    {
                        "itemID": "64b336e200c2a5e8938e9c3f",
                        "quantity": 5,
                        "rating": null
                    }
                ],
                "_id": "64b4aaa918ae4f12091df94c"
            },
            {
                "items": [
                    {
                        "itemID": "64b3393f00c2a5e8938e9c45",
                        "quantity": 1,
                        "rating": null
                    }
                ],
                "_id": "64b4b1859e5717585268c842"
            }
        ],
        "__v": 0
    }
```




Item

An `item` document contains a `title`, `price`, `imgUrl`, `category`, and a `users` property. The `users` property is an array containing sub-documents which are `lightweightUser` objects. The purpose of the `users` property in each `item` document is explained in the Cart section of this markdown. The schemas of the `item` document as well as the `lightweightUser` document are below:

```js
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
        users: {
            type: [lightweightUserSchema],
            required: true
        }
    })
```


An example item document is below:


```js
    {
        "_id": "64b3393f00c2a5e8938e9c45",
        "title": "Spicy Italian Sausage Sub",
        "price": 16.99,
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Spicy_italian_sausage_sub_%28Disney%27s_Hollywood_Studios%29_May_2023.jpg/640px-Spicy_italian_sausage_sub_%28Disney%27s_Hollywood_Studios%29_May_2023.jpg",
        "category": "sandwiches",
        "users": [
            {
                "userID": "64b345092f4f5a5d7097fb93",
                "quantity": 2
            },
            {
                "userID": "64b3455f2f4f5a5d7097fb95",
                "quantity": 1
            }
        ],
        "__v": 0
    }
```




Carts

In this database system, the cart of a specific user is the collection of item documents that contain (within their `users` property) a `lightweightUser` sub-document such that said `lightweightUser` sub-document's `userID` property matches the `_id` of the user. That said, carts are thus created and maintained by manipulating the `users` property of all of the items.

An example of a cart of a user with ID 64b3455f2f4f5a5d7097fb95 is below:

```js
    [
        {
            "_id": "64b3393f00c2a5e8938e9c45",
            "title": "Spicy Italian Sausage Sub",
            "price": 16.99,
            "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Spicy_italian_sausage_sub_%28Disney%27s_Hollywood_Studios%29_May_2023.jpg/640px-Spicy_italian_sausage_sub_%28Disney%27s_Hollywood_Studios%29_May_2023.jpg",
            "category": "sandwiches",
            "users": [
                {
                    "userID": "64b345092f4f5a5d7097fb93",
                    "quantity": 2
                },
                {
                    "userID": "64b3455f2f4f5a5d7097fb95",
                    "quantity": 1
                }
            ],
            "__v": 0
        },
        {
            "_id": "64b33e0f75c5528c7e084c7b",
            "title": "Neapolitan Icecream",
            "price": 6.99,
            "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/So_Delicious_Dairy_Free_Neapolitan_ice_cream.jpg/640px-So_Delicious_Dairy_Free_Neapolitan_ice_cream.jpg",
            "category": "icecream",
            "users": [
                {
                    "userID": "64b3455f2f4f5a5d7097fb95",
                    "quantity": 1
                }
            ],
            "__v": 0
        }
    ]
```




Orders

Orders are carts that have been through the checkout process and are stored as sub-documents inside user documents. Each order belongs to exactly one user and has its own `_id` property.

An example order is below:

```js
    {
        "items": [
            {
                "itemID": "64b3355a00c2a5e8938e9c37",
                "quantity": 5,
                "rating": null
            },
            {
                "itemID": "64b335d900c2a5e8938e9c39",
                "quantity": 5,
                "rating": null
            },
            {
                "itemID": "64b336e200c2a5e8938e9c3f",
                "quantity": 5,
                "rating": null
            }
        ],
        "_id": "64b4aaa918ae4f12091df94c"
    }
```




Routes

There are four main base URLs that this API routes, namely `/api/items`, `/api/cart`, `/api/orders`, and `/api/users`. We will peruse through each and describe the various endpoints that may be used. Note that the `_id` and `__v` properties that exist for some documents or sub-documents are not explicitly mentioned in their schemas. These properties are automatically generated by MongoDB, so any POST request to create said documents should not include them.



`/api/items`

Endpoint: `/api/items/`
Method: GET
Description: Retrieves an array consisting of every item in the items collection.

Endpoint: `/api/items/`
Method: POST
Description: Posts a new food item. Must send a JSON body that satisfies the item schema.

Endpoint: `/api/items/category/<someCategory>`
Method: GET
Description: Retrieves an array of all items from category `<someCategory>`. `<someCategory>` must be one of the following three strings: 'icecream', 'shakes', or 'sandwiches'.

Endpoint: `/api/items/category/<someCategory>/search?title=<someLetters>`
Method: GET
Description: Retrieves an array of all items from category `<someCategory>` that have `title` properties which contain each letter within `<someLetters>`. This is a basic regex search.

Endpoint: `/api/items/<itemID>`
Method: GET
Description: Retrieves a specific item document by its `_id` property.

Endpoint: `/api/items/<itemID>`
Method: PUT
Description: Updates a specific item document by its `_id` property. Must send an update object in JSON. Properties in the update object that are not in the item schema will be ignored.

Endpoint: `/api/items/<itemID>`
Method: DELETE
Description: Deletes a specific item document by its `_id` property.



`/api/cart`

Endpoint: `/api/cart/<userID>`
Method: GET
Description: Retrieves an array of unique items in the cart of a user by their ID.



`/api/orders`

Endpoint: `/api/orders/user/<userID>`
Method: GET
Description: Retrieves an array of all orders of a specific user by their ID.

Endpoint `/api/orders/user/<userID>`
Method: POST
Description: Posts a new order consisting of the user's current cart into their user document and clears the user's cart of items. Returns a statement of completion when successful. This is the most complex route of the API.

Endpoint: `/api/order/<orderID>`
Method: GET
Description: Retrieves an order by its ID.



`/api/users`

Endpoint: `/api/users/`
Method: GET
Description: Retrieves an array of every user in the users collection.

Endpoint: `/api/users/`
Method: POST
Description: Posts a new user into the users collection. Must send a JSON body in the request of an object that satisfies the user schema.

Endpoint: `/api/users/<userID>`
Method: GET
Description: Retrieves a specific user by their ID.

Endpoint: `/api/users/<userID>`
Method: PUT
Description: Updates a user by their ID. Must send a JSON body in the request of an update object.

Endpoint: `/api/users/<userID>`
Method: DELETE
Description: Deletes a user by their ID.




That's it!