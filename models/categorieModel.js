import Sequelize from "sequelize";
import sequelize from "../configs/db.js";


const Category = sequelize.define("Category", {

  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});


export default Category;

