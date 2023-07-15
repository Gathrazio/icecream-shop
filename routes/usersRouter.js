const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user.js');

usersRouter.route('/')
    .get((req, res, next) => { // get all users
        User.find((err, users) => {
            if (err) {
                res.status(500)
                return next(err);
            }
            return res.status(200).send(users);
        })
    })
    .post((req, res, next) => { // post one new user
        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500)
                return next(err);
            }
            return res.status(201).send(savedUser);
        })
    })

usersRouter.route('/:userID')
    .delete((req, res, next) => { // delete user by their ID
        User.findOneAndDelete(
            { _id: req.params.userID },
            (err, deletedUser) => {
                if (err) {
                    res.status(500)
                    return next(new Error("User to be deleted has never existed."))
                }
                if (!deletedItem) {
                    res.status(500)
                    return next(new Error ("User to be deleted has previously been deleted."))
                }
                return res.status(200).send(`Successfully deleted ${deletedUser.firstName} ${deletedUser.lastName} from the users collection.`)
            }
        )
    })
    .get((req, res, next) => { // get one user by their ID
        User.findOne(
            { _id: req.params.userID },
            (err, foundUser) => {
                if (err) {
                    res.status(500)
                    return next(err);
                }
                return res.status(200).send(foundUser);
            }
        )
    })
    .put((req, res, next) => {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            req.body,
            { new: true },
            (err, updatedUser) => {
                if (err) {
                    res.status(500)
                    return next (new Error("User to be updated has never existed."))
                }
                if (!updatedUser) {
                    res.status(404)
                    return next(new Error("User to be updated has previously been deleted."))
                }
                return res.status(201).send(updatedUser);
            }
        )
    })
 
module.exports = usersRouter;