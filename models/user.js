const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

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

// pre-save hook to encrypt user passwords on signup
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next()
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) return next(err)
        user.password = hash;
        next()
    })
})

// pre-save hook to check encrypted password on login
userSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) return callback(err);
        return callback(null, isMatch);
    })
}

// method to remove user's password for token/sending the reponse
userSchema.methods.withoutPassword = function () {
    const user = this.toObject();
    delete user.password
    return user;
}

//method to remove user's password and orders array to keep jwt token small
userSchema.methods.withoutPassOrOrders = function () {
    const user = this.toObject();
    delete user.password
    delete user.orders
    return user;
}

module.exports = mongoose.model("User", userSchema);