'use strict'
const cors = require('cors');
require("dotenv").config();
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const DB_URI = process.env.mongoDB_URI;
const PORT = process.env.PORT || 4001;
const routes = require('./routes/Clients.js');


const router = express.Router();
const app = express();

//use cors to listen from localhost
app.use(cors());
app.use(express.json({extended:true, limit:'50mb'}));
app.use(router);
app.use(routes);

//mongoDB connection
async function ConnectDB () {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Database Connected Successfully`);
    } catch (error) {
        console.error(error);
    }
}

ConnectDB();

//server listen
app.listen(PORT,()=>{
    console.log(`Server listening in PORT ${PORT}`);
})

//CORS config
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

module.exports = app;