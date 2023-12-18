import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Asynchronous Database Connection Function
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.PORT,
  }
);
export default sequelize;
