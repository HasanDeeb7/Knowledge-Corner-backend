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
  connectBookToLibrary,
  getBooksByLibrary,
  getBooksByCategory,
  getBookAddedMonth,
  getRecents,
  getTopAuthors,
  removeFromLibrary,
} from "../controllers/bookController.js";
import { authenticate } from "../middleware/authenticate.js";
import { checkRoles } from "../middleware/checkRoles.js";
import { paginate } from "../middleware/pagination.js";
const router = express.Router();

router.get("/limitedBooks", paginate, getBooksByLimit);

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
router.delete(
  "/delete",
  authenticate,
  checkRoles(["admin", "superAdmin"]),
  deleteBook
);

// // UPDATE a new book
router.patch("/update", upload.single("image"), updateBook);

router.post("/addtolibrary", connectBookToLibrary);
router.patch("/removefromlibrary", removeFromLibrary)
router.get("/libraryBooks", getBooksByLibrary);


router.get('/getNbByCategory',getBooksByCategory)
router.get('/byMonth',getBookAddedMonth)
router.get('/recents',getRecents)

router.get('/top',getTopAuthors)

export default router;
