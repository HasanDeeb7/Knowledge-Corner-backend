import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import categorieRoutes from "./routes/categories.js";
import cors from "cors";
import sequelize from "./configs/db.js";
import userRouter from "./routes/user.js";
import "./associations.js";
import libraryRoute from './routes/libraries.js'

import {authenticate} from './middleware/authenticate.js'
import { checkRoles } from "./middleware/checkRoles.js";
// Load environment variables from a .env file
dotenv.config();

// express app
const app = express();

// Middleware Configuration
// Parse JSON in incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to make the images static
app.use(express.static("public"));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use('/static', express.static(path.join(__dirname, 'public')))

// Enable CORS for all routes
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Define routes for books, authors, and categories
app.use("/api/books",bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/user", userRouter);
app.use("/api/library",libraryRoute)
try {
  await sequelize.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error);
}

// Start the Express.js application on the specified port
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
