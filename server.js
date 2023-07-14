const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to shopdb'))

app.use('/api/items', require('./routes/itemsRouter.js'))
app.use('/api/cart', require('./routes/cartRouter.js'))
app.use('/api/orders', require('./routes/ordersRouter.js'))
app.use('/api/users', require('./routes/usersRouter.js'))

app.use((err, req, res, next) => {
    return res.send({errMsg: err.message})
})

app.listen(9000)