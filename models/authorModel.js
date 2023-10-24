import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Author Schema
const AuthorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  //Date of birth of the author
  dob: {
    type: Date,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  biography: {
    type: String,
    required: true,
  },
  twitterLink: {
    type: String,
    required: false,
  },
  linkedinLink: {
    type: String,
    required: false,
  },
  //Blog or website link of the author
  blogLink: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    default: 0,
    min: 0, 
    max: 5, 
  },
  image: {
    type: String,
    required: false,
  }
});
export default mongoose.model("Author", AuthorSchema);
