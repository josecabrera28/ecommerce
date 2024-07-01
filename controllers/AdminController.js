'use strict'

const ErrorHandler = require('../helpers/ErrorHandler');
const signToken = require('../helpers/Jwt');
const adminModel = require('../models/Admin');
const bcrypt = require('bcrypt');


const registerAdmin = async function (req,res){
    try {
        const data = req.body;
        let registeredAdmin = [];
        registeredAdmin = await adminModel.find({email: data.email});
        if(registeredAdmin.length === 0){
            const encryptedPassword = await bcrypt.hash(data.password,10);
            data.password = encryptedPassword; 
            let newAdmin = await adminModel.create(data);
            newAdmin.password = undefined;
            res.status(200).send({message: newAdmin});
        }else{
            registeredAdmin.forEach(admin => {
                console.log(admin);
            });
            res.status(403).send({message: "Admin already registered"});
        }            
    } catch (error) {
        ErrorHandler(res,403,"RegisterAdmin Ctrl failed.");
    }
}

const loginAdmin = async function (req,res){
    try {
        const data = req.body;
        const adminArray = await adminModel.find({ email: data.email },{email:1,password:1,_id:0});
        if(adminArray == 0 ){
            res.status(403).send({message:"email not found. Please register."});
            return;
        }else{
            const admin = adminArray[0];
            const passwordMatched = await bcrypt.compare(data.password,admin.password);
            if(passwordMatched){
                res.status(200).send({data:admin , token: await signToken(admin)});
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
module.exports = {registerAdmin, loginAdmin}