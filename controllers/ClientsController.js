'use strict'

const ErrorHandler = require('../helpers/ErrorHandler');
const clients = require('../models/clients');
const clientsModel = require('../models/clients');
const bcrypt = require('bcrypt');


const registerClient = async function (req,res){
    try {
        const data = req.body;
        let registeredUsers = [];
        registeredUsers = await clientsModel.find({email: data.email});
        if(registeredUsers.length === 0){
            const encryptedPassword = await bcrypt.hash(data.password,10);
            data.password = encryptedPassword; 
            let newUser = await clientsModel.create(data);
            newUser.password = undefined;
            res.status(200).send({message: newUser});
        }else{
            registeredUsers.forEach(user => {
                console.log(user);
            });
            res.status(403).send({message: "User already registered"});
        }            
    } catch (error) {
        ErrorHandler(res,403,"RegisterClient Ctrl failed.");
    }
}

const loginClient = async function (req,res){
    try {
        const data = req.body;
        const clientArray = await clients.find({ email: data.email },{email:1,password:1,_id:0});
        if(clientArray == 0 ){
            res.status(403).send({message:"email not found. Please register."});
            return;
        }else{
            const user = clientArray[0];
            const passwordMatched = await bcrypt.compare(data.password,user.password);
            if(passwordMatched){
                res.status(200).send(clientArray);
                return;
            }else{
                res.status(403).send({message:"Incorrect email or password."});
                return;
            }
        }
    } catch (error) {
        ErrorHandler(res,403,error)
    }
}

module.exports = {registerClient, loginClient}