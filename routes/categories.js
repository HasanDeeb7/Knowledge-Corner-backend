import express from "express";
import {
  createCtegory,
  getCtegory,
  getCtegories,
  deleteCtegory,
  updateCtegory,
} from "../controllers/categorieController.js";

const router = express.Router();

// GET all books
router.get("/", getCtegories);

// GET a single category
router.get("/:id", getCtegory);

// // POST a new catrgory
router.post("/", createCtegory);

// DELETE a new book
router.delete("/:id", deleteCtegory);

// // // UPDATE a category
router.patch("/:id", updateCtegory);

export default router;
