// jshint esversion:6
let express = require('express');
let app = express();
let mongoose = require('mongoose');


let userRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true }); // connecting to database mongodb port 27017
app.use(express.json());


app.use(express.static('public')); //redirecting localhost 3000 to index.html

app.use('/users',userRouter);


app.listen(3000,()=>console.log('Listening 3000...'));
