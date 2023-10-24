import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

// Asynchronous Database Connection Function
const connect = async () => {
    try {
      // Connect to MongoDB using the provided URI from environment variables
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to mongoDB");
    } catch (error) {
      throw error;
    }
  }; 
export default connect