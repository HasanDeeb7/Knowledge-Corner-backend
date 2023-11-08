import Book from "../models/bookModel.js";
import mongoose from "mongoose";
import Author from "../models/authorModel.js";
import { upload } from "../middleware/multer.js";
import Category from "../models/categorieModel.js";
import path from "path";
import fs from "fs";

export const getBooksByLimit = async (req, res) => {
  const limit = req.query.limit || 6; // Default to 6 if limit is not provided in the query params
  const books = await Book.find({}).limit(parseInt(limit));

  res.status(200).json(books);
};

// get all books

export const getBooks = async (req, res) => {
  const books = await Book.find({});

  res.status(200).json(books);
};

// get book by autherId

export const getBookByAutherId = async (req, res) => {
  const Id = req.params.id; // Assuming the author ID is passed as a URL parameter

  // Check if the provided authorId is a valid ObjectId.
  if (!mongoose.Types.ObjectId.isValid(Id)) {
    return res.status(404).json({ error: "No such Auther" });
  }

  const book = await Book.find({ authorId: Id });

  // If no books are found for the specified authorId, return a 404 error
  if (!book) {
    return res.status(404).json({ error: "No such a book" });
  }

  res.status(200).json(book);
};

// get book by categoryName

export const getBookByCategoryId = async (req, res) => {
  const categoryName = req.params.name; // Assuming the category name is passed as a URL parameter

  try {
    // Attempt to find the category in the database based on the provided categoryName.
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find books in the database with the categoryId matching the found category.
    const books = await Book.find({ categoryId: category._id });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single book

export const getBook = async (req, res) => {
  // Extract the book ID from the URL parameters.
  const { id } = req.params;

  // Check if the provided book ID is a valid ObjectId.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  // Attempt to find the book in the database based on the provided ID.
  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ error: "No such a book" });
  }

  res.status(200).json(book);
};

// create a new book with upload image

export const createBook = async (req, res) => {
  // Extract book details and uploaded image from the request.
  const {
    title,
    ISBN,
    publicationDate,
    description,
    nbPages,
    authorId,
    categoryId,
    language,
    rating,
  } = req.body;

  // Check if an image file was uploaded. If not, return a 400 error.
  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image" });
  }

  // Retrieve the path of the uploaded image from Multer.
  const image = req.file.filename;
  // const path = "images/"+req.file.filename

  try {
    // Create a new book in the database with the provided details, including the image path.
    const book = await Book.create({
      title,
      ISBN,
      publicationDate,
      description,
      nbPages,
      authorId,
      categoryId,
      image,
      language,
      rating,
    });

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
    const path = `public/images/${req.file.filename}`;
    fs.unlinkSync(path);
  }
};

// delete a book

export const deleteBook = async (req, res) => {
  // Extract the book's ID from the URL parameters.
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId. If not, return a 404 error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  // Attempt to find and delete the book by its ID.
  const book = await Book.findOneAndDelete({ _id: id });
  // fs.unlinkSync(book.image);

  if (!book) {
    return res.status(400).json({ error: "No such a book" });
  }

  res.status(200).json(book);
};

// update a book

export const updateBook = async (req, res) => {
  const { id } = req.params;
  // Validation for he type of the news ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Books not found",
    });
  }

  // Fetch the current news post
  const oldBook = await Book.findById(id);

  try {
    // Extract updated data from the request
    const updatedData = req.body;

    const oldImagePath = `public/images/${oldBook.image}`;

    console.log("Old Image Path:", oldBook.image);

    if (req.file) {
      updatedData.image = req.file.filename;

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          return res.status(500).json({
            error: `error deleting the old image`,
          });
        }
      });
    }

    // Update the news post and respond with the updated data
    const updatedBook = await Book.findByIdAndUpdate({ _id: id }, updatedData, {
      new: true,
    });

    return res.json(updatedBook);
  } catch (error) {
    return res.status(500).json({
      error: `Error, ${error.message}`,
    });
  }
};
