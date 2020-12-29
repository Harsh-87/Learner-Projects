//jshint esversion:6
require('dotenv').config();
let express = require('express');
let router =express.Router();

let User = require('../models/users').User;  // <!-- from post1.js we are importing post class -->

const nodemailer = require("nodemailer");
async function main(user) {
  let transporter = nodemailer.createTransport({
    service:'Gmail',
    auth: {
      user:process.env.EMAIL, // generated ethereal user
      pass:process.env.PASSWORD // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: 'harshkothari71298@gmail.com '+user.email, // list of receivers
    subject: "Visitor recorded : Name : "+user.name, // Subject line
    text: "Visitor checkedout !!\n\nName : "+user.name+"\nEmail : "+user.email+"\nPhone : "+user.phone+"\nCheckin time : "+user.checkIN+"\nCheckout time : "+user.checkOUT, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
router.post('/login', async (req,resp)=>{

    let email = req.body.email;
    let phone = req.body.phone;
    let name  = req.body.name;

    let user = await User.findOne().where({email : email});
    if(user)
    {
        User.updateOne({email:email},{checkOUT : Date()},function(err){
          if(err){
            console.log(err);
          }
        });
        resp.send('checkout successful!!');
        main(user).catch(console.error);
        // console.log(process.env.EMAIL);
        // console.log(process.env.PASSWORD);

    }
    else
    {
        resp.status(400);
        resp.send('rejected');
    }
});
router.post('/register', async (req,resp)=>{

    let email = req.body.email;
    let phone = req.body.phone;
    let name  = req.body.name;


    let user = await User.findOne().where({email : email}&&{phone : phone}&&{name : name});
    if(!user)
    {
        let newUser = new User({
            email : email,
            phone : phone,
            name : name,
            checkIN :Date(),
        });
        await newUser.save();
        resp.send('Registered Successfully!');
    }
    else
    {
        resp.send('Use another email!');
    }
});

module.exports = router;
