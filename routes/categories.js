import express from "express";
import {
  createCtegory,
  getCategory,
  getCtegories,
  deleteCtegory,
  updateCtegory,
} from "../controllers/categorieController.js";

const router = express.Router();

// GET all categories
router.get("/", getCtegories);


// GET a single book
router.get("/:id", getCategory);

// // POST a new catrgory
router.post("/", createCtegory);

// DELETE a category
router.delete("/:id", deleteCtegory);

// // // UPDATE a category
router.patch("/:id", updateCtegory);

export default router;

