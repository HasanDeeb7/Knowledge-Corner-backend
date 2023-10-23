import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
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
  blogLink: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    default: 0,
  },
  image: {
    type: String,
    required: false,
  }
});
export default mongoose.model("Author", AuthorSchema);
