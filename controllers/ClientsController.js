'use strict'

const clientsModel = require('../models/clients');



const registerClient = async function (req,res){
    res.status(200).send('route working!!');
}

module.exports = {registerClient}