let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    
    name : String,
    email : String,
    phone : String,
    checkIN : Date,
    checkOUT : Date
});
let User = mongoose.model('User',userSchema,'users');

module.exports ={User}