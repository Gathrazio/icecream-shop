const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user.js');

usersRouter.route('/')
    .get((req, res, next) => { // get all users
        User.find()
            .then(users => res.status(200).send(users))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })
    .post((req, res, next) => { // post one new user
        const newUser = new User(req.body);
        newUser.save()
            .then(savedUser => res.status(201).send(savedUser))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })

usersRouter.route('/:userID')
    .delete((req, res, next) => { // delete user by their ID
        User.findOneAndDelete({ _id: req.params.userID })
            .then(deletedUser => {
                if (!deletedUser) {
                    res.status(500)
                    return next(new Error ("User to be deleted has previously been deleted."));
                }
                return res.status(200).send(`Successfully deleted ${deletedUser.firstName} ${deletedUser.lastName} from the users collection.`);
            })
            .catch(err => {
                res.status(500)
                return next(new Error("User to be deleted has never existed."));
            })
    })
    .get((req, res, next) => { // get one user by their ID
        User.findOne({ _id: req.params.userID })
            .then(user => res.status(200).send(user))
            .catch(err => {
                res.status(500)
                return next(err);
            })
    })
    .put((req, res, next) => {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            req.body,
            { new: true }
        )
            .then(updatedUser => {
                if (!updatedUser) {
                    res.status(404)
                    return next(new Error("User to be updated has previously been deleted."));
                }
                return res.status(201).send(updatedUser);
            })
            .catch(err => {
                res.status(500)
                return next(new Error("User to be updated has never existed."));
            })
    })
 
module.exports = usersRouter;