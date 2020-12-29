// jshint esversion:6
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');     //creates a hash by md5(tobehashedstring);
// const bcrypt = require('bcrypt');
// const saltrounds = 10;          //saltrounds for bcrypt
const mongoose = require('mongoose');
const express = require('express');
//passport
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

//passport
app.use(session({
  secret:"Littlesecret",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/loginDB",{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const loginSchema = new mongoose.Schema({
  username : String,
  password : String
});
//mongoose-encryption
// const mongoose_encryption_secret = "Weareworking!";
// loginSchema.plugin(encrypt,{secret:mongoose_encryption_secret , encryptedFields:["password"]});

loginSchema.plugin(passportLocalMongoose);

//at last
const User = new mongoose.model("User",loginSchema);

//passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
  if(req.isAuthenticated()){
    res.redirect("/secret");
  }else{
    res.redirect("/register");
  }
});

app.get("/login",function(req,res){
  res.sendFile(__dirname+'/public/login.html');
});

app.get("/register",function(req,res){
  res.sendFile(__dirname+"/public/register.html");
});


app.post("/login",function(req,res){
  const mail = req.body.username;
  const pass = req.body.password;
  // const mdpass = md5(pass);              // for md5

  //passport
  const user = new User({
    username:mail,
    password:pass
  });
  req.login(user, function(err) {
    if (err) { console.log(err); alert("Failed");}
    else{
      passport.authenticate('local')(req,res,function(){
        res.redirect("/secret");
      });
    }
  });

  // User.findOne({username:mail},function(err,foundUser){
  //   if(!err){
  //     if(foundUser){
  //       if(foundUser.password === pass){
  //         console.log('Logged In');
  //       }
  //       //Uncomment for bcrypt
  //       // bcrypt.compare(pass,foundUser.password,function(err,result){
  //       //   if(result === true){
  //       //     console.log('Logged In');
  //       //   }
  //       // });
  //
  //       //Uncomment for md5
  //        // if(foundUser.password === mdpass){
  //        //  console.log('Logged In');
  //        // }
  //        res.redirect("/secret");
  //     }
  //   }else{
  //     console.log(err);
  //   }
  // });
});

app.post("/register",function(req,res){
  const mail = req.body.username;
  const pass = req.body.password;
  // const mdpass = md5(pass); // for md5
  // bcrypt.hash(pass, saltrounds, function(err, hash) { // Uncomment for bcrypt
    // const user = new User({
    //   name:username,
    //   password:pass
    //   // password:hash // Uncomment for bcrypt
    //   // password:mdpass
    // });
    // user.save();
    // res.render("secret");
  // }); // Uncomment for bcrypt

  //passport
  User.register({username:mail},pass,function(err,user){
    if(err){
      console.log(err);
      alert("Failed");
      res.redirect("/register");
    }else{
      passport.authenticate('local')(req,res,function(){
        res.redirect("/secret");
      });
    }
  });

});

app.get("/secret",function(req,res){
  // res.render("secret");
  if(req.isAuthenticated()){
    res.render("secret");
    alert("Successfully logged in !!Welcome");
  }else{
   res.redirect("/");
  }
});

app.get("/logout",function(req,res){
  //passport
  req.logout();
  res.redirect("/");
  alert("Successfully logged out !!Come soon");

});

app.listen(3000,()=> console.log('Listening on port 3000!'));
