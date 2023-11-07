import express from "express";
import {
  getAuthors,
  getAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthor,
} from "../controllers/authorController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

//Get all authors
router.get("/", getAuthors);

//Get an authors
router.get("/:id", getAuthor);

//Post an authors
router.post("/",upload.single('image'),createAuthor);

//Delete an author
router.delete("/:id", deleteAuthor);

//Update an author
router.patch("/:id",upload.single('image') ,updateAuthor);
  
export default router; 
