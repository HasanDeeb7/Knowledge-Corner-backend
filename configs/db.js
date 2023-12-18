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
    port: process.env.DB_PORT,
  }
);
export default sequelize;

// import dotenv from "dotenv"
// import mongoose from "mongoose"

// dotenv.config()

// // Asynchronous Database Connection Function
// const connect = async () => {
//     try {
//       // Connect to MongoDB using the provided URI from environment variables
//       await mongoose.connect(process.env.MONGO_URI);
//       console.log("Connected to mongoDB");
//     } catch (error) {
//       throw error;
//     }
//   }; 
// export default connect