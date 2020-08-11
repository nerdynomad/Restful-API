const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
//require('dotenv/config') 

//Middlewares
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

const postRoute = require('./routes/posts')
app.use('/posts', postRoute)


//Routes
app.get('/', (req,res) => {
    res.send('Hello World')
})


//Connect DB
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('Connected to DB')
})


app.listen(8080, () => {
    console.log("Connected to server ")
})
