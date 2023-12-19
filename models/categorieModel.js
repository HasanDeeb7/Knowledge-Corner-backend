import Sequelize from "sequelize";
import sequelize from "../configs/db.js";


const Category = sequelize.define("Category", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});


export default Category;

