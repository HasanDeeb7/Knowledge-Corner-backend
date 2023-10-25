// Import necessary modules
import Category from "../models/categorieModel.js"; // Import the Category model
import mongoose from "mongoose"; // Import the Mongoose library

// Get a single category
export const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category" });
  }

  // Find and return a single category by its ID
  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({ error: "No such a category" });
  }

  res.status(200).json(category);
};

// Get all Categories
export const getCtegories = async (req, res) => {
  // Retrieve all categories from the database and sort them by the 'createdAt' field in descending order
  const categories = await Category.find({}).sort({ createdAt: -1 });

  res.status(200).json(categories);
};

// Add a category to the database
export const createCtegory = async (req, res) => {
  const { name } = req.body;

  // Attempt to create a new category document in the database
  try {
    const category = await Category.create({
      name,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category from the database
export const deleteCtegory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category" });
  }

  // Find and delete a category by its ID
  var delcat = await Category.findOneAndDelete({ _id: id });

  if (!delcat) {
    return res.status(400).json({ error: "No such a category" });
  }

  res.status(200).json(delcat);
};

// Update a category
export const updateCtegory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category" });
  }

  // Find and update a category by its ID with the data from the request body
  const updCat = await Category.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // Update category with the data in the request body
    }
  );

  if (!updCat) {
    return res.status(404).json({ error: "No such a category" });
  }

  res.status(200).json(updCat);
}