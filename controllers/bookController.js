import Book from "../models/bookModel.js";
import mongoose from "mongoose";
import Author from "../models/authorModel.js";
import { upload } from "../middleware/multer.js";
import Category from "../models/categorieModel.js"

// get all books

export const getBooks = async (req, res) => {
  // Retrieve all books from the database using the Mongoose model.
  const books = await Book.find({});

  // Send a JSON response with the retrieved books and a 200 status code.
  res.status(200).json(books);
};


// get book by autherId

export const getBookByAutherId = async (req, res) => {
  const Id = req.params.id; // Assuming the author ID is passed as a URL parameter

  // Check if the provided authorId is a valid ObjectId.
  if (!mongoose.Types.ObjectId.isValid(Id)) {
    return res.status(404).json({ error: "No such Auther" });
  }

  // Find books in the database with the specified authorId.
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

    // If the category does not exist, return a 404 error.
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find books in the database with the categoryId matching the found category.
    const books = await Book.find({ categoryId: category._id });
    res.status(200).json(books);
  } catch (error) {
    // Handle any potential errors and return a 500 error response with the error message.
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

  // If the book does not exist, return a 404 error.
  if (!book) {
    return res.status(404).json({ error: "No such a book" });
  }

  // Send a JSON response with the book details and a 200 status code.
  res.status(200).json(book);
};

// create a new book with upload image

export const createBook = async (req, res) => {
  // Use Multer middleware to handle image upload and any potential errors.
  upload.single("image")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

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
    const image = req.file.path;

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

      // Send a JSON response with the newly created book and a 200 status code.
      res.status(200).json(book);
    } catch (error) {
      // Handle any potential errors that may occur during book creation and return a 400 error response with the error message.
      res.status(400).json({ error: error.message });
    }
  });
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

  // If the book is not found, return a 400 error.
  if (!book) {
    return res.status(400).json({ error: "No such a book" });
  }

  // Send a JSON response with the deleted book and a 200 status code upon successful deletion.
  res.status(200).json(book);
};

// update a book

export const updateBook = async (req, res) => {
  // Extract the book's ID from the URL parameters.
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId. If not, return a 404 error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  // Attempt to find and update the book by its ID with the provided request body data.
    const book = await Book.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    // If the book is not found, return a 404 error.
    if (!book) {
        return res.status(404).json({ error: "No such a book" })
    }

    // Send a JSON response with the updated book and a 200 status code upon successful update.
  res.status(200).json(book);
};
