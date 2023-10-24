// newww one
// import Book from "../models/bookModel.js";
import Category from "../models/categorieModel.js"; //import model
import mongoose from "mongoose";

// get all Categories

export const getCtegories = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 });

  res.status(200).json(categories);
};

// add categry to db
export const createCtegory = async (req, res) => {
  const { name } = req.body;
  // add doc to db
  try {
    const category = await Category.create({
      name,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete category from db

export const deleteCtegory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such categories" });
  }

  var delcat = await Category.findOneAndDelete({ _id: id });

  if (!Category) {
    return res.status(400).json({ error: "No such a book" });
  }

  res.status(200).json(delcat);
};

// update categories

export const updateCtegory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category" });
  }

  const updCat = await Category.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!Category) {
    return res.status(404).json({ error: "No such a categories" });
  }

  res.status(200).json(updCat);
};

// {"title":
// "Anothersss Book Title",
// "ISBN":
// "0987095434568",
// "publicationDate":
//  null,
// "description":
// "This is another sample book description.",
// "nbPages":
// 320,
// "category":"newss",
// "image":
// "sefwsef",
// "language":
// "French",
// "rating":
// 4.2}
