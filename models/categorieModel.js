import Sequelize from 'sequelize'
import sequelize from '../configs/db.js'

const Category=sequelize.define('Category',{

  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  Name:{
    type:Sequelize.STRING,
    allowNull:false
  },


})

export default Category

// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// const CategorySchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       maxlength: 20,
//     },
//   },
//   { timestamps: true }
// );
// export default mongoose.model("Category", CategorySchema);
