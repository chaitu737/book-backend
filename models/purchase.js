const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let purchaseSchema = new Schema({
    email:{type:String,required:true},
    bookId:{type:String, required:true}
})

module.exports = mongoose.model('Purchase', purchaseSchema)