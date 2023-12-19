import express from "express";
import multer from "multer";
import path from "path";
import { upload } from "../middleware/multer.js";
import {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  getBookByAuthorId,
  getBookByCategoryId,
  getBooksByLimit,
} from "../controllers/bookController.js";
import authenticate from './middleware/authenticate.js'
import { checkRoles } from "./middleware/checkRoles.js";
const router = express.Router();

router.get("/limitedBooks", getBooksByLimit);

// GET all books
router.get("/", getBooks);

// GET a single book
router.get("/getone", getBook);

// GET book by autherID
router.get("/getBookByAuthorId/", getBookByAuthorId);

// GET book by CategoryID
router.get("/getBookByCategoryID/:name", getBookByCategoryId);

// POST a new book
router.post("/add", upload.single("image"), createBook);

// // DELETE a new book
router.delete("/delete", authenticate, checkRoles(['admin','superadmin']),deleteBook);

// // UPDATE a new book
router.patch("/update", upload.single("image"), updateBook);

export default router;
