//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const routes = require("./routes/routes.js");
require('./models/database.js');
const mongoose = require("mongoose");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//connecting to mongoDB server
if(process.env.port){
  mongoose.connect(process.env.PORT,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
}else{
  const config = require('./appConfig.js');
  mongoose.connect(config.DBURL,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
}

//initializing routes
routes.initialize(app);

//Setting up port for listening
let port = process.env.PORT;
if (port == null || port == "") { port = 3000; }
app.listen(port, function () {
  console.log("Server started on port 3000");
});
