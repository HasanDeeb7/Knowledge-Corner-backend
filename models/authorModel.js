import Sequelize from 'sequelize'
import sequelize from '../configs/db.js'

const Author=sequelize.define('Author',{
id:{
  type:Sequelize.INTEGER,
  primaryKey:true,
  autoIncrement:true
},
firstName:{
  type:Sequelize.STRING,
  allowNull:false
},
lastName:{
  type:Sequelize.STRING,
  allowNull:false
},
  dob: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  biography: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  twitterLink: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  linkedinLink: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  blogLink: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rating: {
    type: Sequelize.STRING,
    default: 0,
    min: 0, 
    max: 5, 
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  }


})

export default Author


// import mongoose from "mongoose";

// const Schema = mongoose.Schema;
// //Author Schema
// const AuthorSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   //Date of birth of the author
//   dob: {
//     type: Date,
//     required: false,
//   },
//   nationality: {
//     type: String,
//     required: false,
//   },
//   biography: {
//     type: String,
//     required: true,
//   },
//   twitterLink: {
//     type: String,
//     required: false,
//   },
//   linkedinLink: {
//     type: String,
//     required: false,
//   },
//   //Blog or website link of the author
//   blogLink: {
//     type: String,
//     required: false,
//   },
//   rating: {
//     type: String,
//     default: 0,
//     min: 0, 
//     max: 5, 
//   },
//   image: {
//     type: String,
//     required: false,
//   }
// });
// export default mongoose.model("Author", AuthorSchema);
