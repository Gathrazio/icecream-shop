const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

authRouter.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() })
        .then(user => {
            if (user) {
                res.status(403)
                return next(new Error('Username is already taken.'));
            }
            const newUser = new User({...req.body, username: req.body.username.toLowerCase()});
            newUser.save()
                .then(savedUser => {
                    const token = jwt.sign(savedUser.withoutPassword(), process.env.USER_SECRET);
                    return res.status(201).send({
                        token,
                        user: savedUser.withoutPassword()
                    });
                })
        })
        .catch(err => {
            res.status(500)
            return next(err);
        })
})

authRouter.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() })
        .then(user => {
            if (!user) {
                res.status(403)
                return next(new Error("User does not exist."));
            }
            user.checkPassword(req.body.password, (err, isMatch) => {
                if (err) {
                    res.status(403)
                    return next(new Error("Failed to check password."));
                }
                if (!isMatch) {
                    res.status(403)
                    return next(new Error("Password is incorrect."));
                }
                const token = jwt.sign(user.withoutPassOrOrders(), process.env.USER_SECRET);
                res.status(200).send({
                    token,
                    user: user.withoutPassword()
                })
            })
        })
        .catch(err => {
            res.status(500)
            return next(err);
        })
})

module.exports = authRouter;