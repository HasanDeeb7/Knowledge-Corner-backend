import mongoose from "mongoose"

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    publicationDate: { type: Date , required:true},
    description: { type: String , required:true},
    nbPages: { type: Number , required : true},
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }, 
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
    image: { type: String , required : true},
    language: { type: String , required:true},
    rating: { type: Number , default:0},
},{timestamps:true})

export default mongoose.model('Book',bookSchema)

