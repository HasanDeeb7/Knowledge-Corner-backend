import express from "express";
import {
  createCtegory,
  getCtegories,
  getCtegory,
  getCtegories,
  deleteCtegory,
  updateCtegory,
} from "../controllers/categorieController.js";

const router = express.Router();

<<<<<<< HEAD
<<<<<<< HEAD
// GET all books
router.get("/", getCtegory);
=======
// GET all categories
router.get("/", getCtegories);
>>>>>>> 6fd994c69d82f07d11f7d6e9c3eeab0eb7a1012c
=======
// GET all categories
router.get("/", getCtegories);
>>>>>>> Louai

// // GET a single book
// router.get("/:id", getCtegory);

// // POST a new catrgory
router.post("/", createCtegory);

// DELETE a category
router.delete("/:id", deleteCtegory);

// // // UPDATE a category
router.patch("/:id", updateCtegory);

export default router;

