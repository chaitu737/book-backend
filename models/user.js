const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique:true},
    password:{type:String},
    email:{type:String, required:true, unique:true},
    userId:{
        type:String,index:true,unique:true },
    

});
module.exports = mongoose.model('Users', userSchema);