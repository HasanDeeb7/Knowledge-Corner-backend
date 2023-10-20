const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({

},{timestamps:true})

module.exports = mongoose.model('Book',bookSchema)