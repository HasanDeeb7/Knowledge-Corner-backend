import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import categorieRoutes from "./routes/categories.js";
import cors from "cors";
import connect from "./configs/db.js";
import userRouter from './routes/user.js'
// Load environment variables from a .env file
dotenv.config();

// express app
const app = express();

// Middleware Configuration
// Parse JSON in incoming requests
app.use(express.json());

// to make the images static
app.use(express.static("public"));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use('/static', express.static(path.join(__dirname, 'public')))

// Enable CORS for all routes
app.use(cors());

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Define routes for books, authors, and categories
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/user",userRouter)

// Start the Express.js application on the specified port
app.listen(process.env.PORT, () => {
  connect();
  console.log(`listening on port ${process.env.PORT}`);
});
