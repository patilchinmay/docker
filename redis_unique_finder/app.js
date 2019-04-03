const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// const mongoose = require('mongoose');

const userRoutes = require('./routes/users.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handling CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// Routes which should handle requests
app.use('/users', userRoutes);

var redis = require('redis');
var client = redis.createClient(6379, 'redis')

// Handle requests to invalid URLs and throw errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Handling all other errors e.g. a database error, where an error is already generated and passed as an argument
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;