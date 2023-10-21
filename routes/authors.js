import express from "express";
import {
  getAuthors,
  getAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthor,
} from "../controllers/authorController.js";
const router = express.Router();

//Get all authors
router.get("/", getAuthors);

//Get an authors
router.get("/:id", getAuthor);

//Post an authors
router.post("/", createAuthor);

//Delete an author
router.delete("/:id", deleteAuthor);

//Update an author
router.patch("/:id", updateAuthor);

export default router;
