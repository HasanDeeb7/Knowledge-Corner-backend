import { DataTypes } from "sequelize";
import sequelize from "../configs/db.js";

//User Model
const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    required: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin", "superAdmin", "manager"),
    allowNull: false,
    defaultValue: "user",
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
});

export default User;
