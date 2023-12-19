import { DataTypes } from "sequelize";
import sequelize from "../configs/db.js";
import Book from "./bookModel.js";

const Library = sequelize.define("Library", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type:DataTypes.ENUM(['active','inactive'])
  }
});


export default Library;
