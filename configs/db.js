import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

// const URL = process.env.URL
// const PORT = process.env.PORT

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to mongoDB");
    } catch (error) {
      throw error;
    }
  }; 
  
export default connect