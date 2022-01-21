const express = require("express");
// const path = require("path");


// const Product = require("../models/product.model");
// const User = require("../models/user.model");

const Admin=require("../models/admin.model");

 const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("", async (req, res) => {
    
try {
        const newAdmin = await Admin.create(req.body);
        const arr=[
            "shubham@gmail.com",
            "dhaval@gmail.com",
            "kamal@gmail.com",
            "aleem@gmail.com",
            "ajay@gmail.com",
            
        ];
        sendEmail(
            "Shubhammishra@gmail.com",
            arr,
            `${req.body.first_name} ${req.body.last_name} has registerd with us`,
            `Please Welcome  ${req.body.first_name}`,
            "<h1> Hello</h1>",
        );
        return res.status(201).send({ newAdmin });
       
    }
    catch (err) {
        return res.status(500).send(err.message);
      }
   

});

router.get("", async (req, res) => {
    try {
        admin = await Admin .find().lean().exec();
  
      return res.status(200).send(admin);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  

module.exports =router; 