'use strict'

const mongoose = require("mongoose");

const adminModel = new mongoose.Schema({
    "firstName": {type: "String", required: true},
    "lastName": {type: "String", required: true},
    "email": {type: "String",unique:true, required: true},
    "password": {type: "String", unique:true ,required: true},
    "profile": {type: "String",default:'perfil.png', required: true},
    "role": {type: "String", required: true},
});

module.exports= mongoose.model('admin',adminModel);