

const mongoose = require('mongoose')

const Schema = mongoose.Schema

let bookSchema = new Schema({

    bookId: { type: String, unique: true, required: true },
    title: { type: String, default: '' },

    
    description: { type: String, default: '' },
    price:{type:Number, required:true}
    
})

module.exports =mongoose.model('Books', bookSchema)
