import express from "express";
import {
  createCtegory,
  getCtegory,
  deleteCtegory,
  updateCtegory,
} from "../controllers/categorieController.js";

const router = express.Router();

// GET all categories
router.get("/", getCtegory);

// // GET a single category
router.get("/:id", getCtegory);

// // POST a new catrgory
router.post("/", createCtegory);

// DELETE a category
router.delete("/:id", deleteCtegory);

// // // UPDATE a category
router.patch("/:id", updateCtegory);

export default router;

