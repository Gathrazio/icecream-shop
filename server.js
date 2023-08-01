const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const { expressjwt: jwt } = require('express-jwt');
require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to shopdb'))

app.use(express.static(path.join(__dirname, 'client', 'dist')))
app.use('/api/items', require('./routes/itemsRouter.js'))
app.use('/api/auth', require('./routes/authRouter.js'))
app.use('/api/protected', jwt({ secret: process.env.USER_SECRET, algorithms: ['HS256'] }))
app.use('/api/protected/cart', require('./routes/cartRouter.js'))
app.use('/api/protected/orders', require('./routes/ordersRouter.js'))
app.use('/api/protected/users', require('./routes/usersRouter.js'))
app.use('/api/protected/ratings', require('./routes/ratingsRouter.js'))

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.listen(9000)