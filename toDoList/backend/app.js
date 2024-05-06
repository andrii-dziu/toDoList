const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require('./routs/tasks');

const app = express();

mongoose.connect('mongodb+srv://new_user:' + '5TM2Y5ycGeJ4vZb1'  + '@cluster0.dejasy4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to DB')
    }).catch(() => {
        console.log('Connection failed')
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
})

app.use('/api/tasks', taskRoutes)

module.exports = app;
