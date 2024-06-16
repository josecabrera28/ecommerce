'use strict'

const mongoose = require("mongoose");

const clientsModel = new mongoose.Schema({
    "firstName": {type: "String", required: true},
    "lastName": {type: "String", required: true},
    "country": {type: "String", required: true},
    "city": {type: "String", required: true},
    "address": {type: "String", required: true},
    "email": {type: "String", required: true},
    "profile": {type: "String", required: true},
    "phoneNumber": {type: "Number", required: true},
    "gender": {type: "string", required: true},
});

module.exports= mongoose.model('clients',clientsModel);