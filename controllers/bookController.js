import Book from "../models/bookModel.js";
import mongoose, { model } from "mongoose";
import Author from "../models/authorModel.js";
import { upload } from "../middleware/multer.js";
import Category from "../models/categorieModel.js";
import path from "path";
import fs from "fs";
import Library from "../models/libraryModel.js";
import { Op, where } from "sequelize";

export const getBooksByLimit = async (req, res) => {
  const limit = req.query.limit || 6; // Default to 6 if limit is not provided in the query params
  const books = await Book.findAll({});

  res.status(200).json(books);
};

// get all books

// get book by autherId

export const getBookByAuthorId = async (req, res) => {
  const { id } = req.query; // Assuming the author ID is passed as a URL parameter

  // Check if the provided authorId is a valid ObjectId.
  if (!id) {
    return res.status(404).json({ error: "No id provided" });
  }

  const book = await Book.findAll({
    include: { model: Author, where: { id: id } },
  });

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
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "No id provided" });
  }

  const book = await Book.findByPk(id);
  if (!book) {
    return res.status(404).json({ error: "Book Not Found" });
  }

  res.status(200).json(book);
};

export const createBook = async (req, res) => {
  // Extract book details and uploaded image from the request.
  const {
    title,
    ISBN,
    publicationDate,
    description,
    nbPages,
    language,
    rating,
    authorId,
    categoryName,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image" });
  }

  const image = req.file.filename;

  try {
    const author = authorId ? await Author.findByPk(authorId) : null;
    const category = categoryName
      ? await Category.findOne({ where: { Name: categoryName } })
      : "Other";
    // Create a new book in the database with the provided details, including the image path.
    const book = await Book.create({
      title,
      ISBN,
      publicationDate,
      description,
      nbPages,
      image,
      language,
      rating,
      authorName: author ? `${author.firstName} ${author.lastName}` : "Unknown",
      categoryName: categoryName,
    });
    if (author) {
      book.setAuthor(author);
    }
    if (category) {
      book.setCategory(category);
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
    const path = `public/images/${req.file.filename}`;
    fs.unlinkSync(path);
  }
};

// delete a book

export const deleteBook = async (req, res) => {
  // Extract the book's ID from the URL parameters.
  const { id } = req.query;
  console.log(id);
  // Check if the provided ID is a valid MongoDB ObjectId. If not, return a 404 error.
  if (!id) {
    return res.status(400).json({ error: "No Id provided" });
  }

  // Attempt to find and delete the book by its ID.
  const book = await Book.destroy({ where: { id: id } });
  // fs.unlinkSync(book.image);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json({ success: "Book Deleted Successfuly" });
};

// update a book

export const updateBook = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(404).json({
      error: "No id provided",
    });
  }

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedData = req.body;

    const oldImagePath = `public/images/${book.image}`;

    console.log("Old Image Path:", book.image);

    if (req.file) {
      updatedData.image = req.file.filename;

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          return res.status(500).json({
            error: `Error deleting the old image`,
          });
        }
      });
    }

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key]) {
        book.setDataValue(key, updatedData[key]);
      } else {
        book.setDataValue(key, book[key]);
      }
    });

    await book.save();

    return res.json(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: `Error, ${error.message}`,
    });
  }
};

export async function connectBookToLibrary(req, res) {
  try {
    const { bookId, libraryId } = req.body;
    const library = await Library.findByPk(libraryId);
    const book = await Book.findByPk(bookId);
    await library.setBooks(book);
    res.json({ success: `${book.title} Added to ${library.name} library` });
  } catch (error) {
    console.log(error);
  }
}

export async function getBooksByLibrary(req, res) {
  try {
    const libraryId = req.query.id;
    const library = await Library.findByPk(libraryId, {
      include: {
        model: Book,
        include: [Author, Library],
      },
    });
    if (library) {
      res.json(library.Books);
    }
  } catch (error) {
    console.log(error);
  }
}
export const getBooks = async (req, res) => {
  const books = await Book.findAll({
    include: [Author, Library],
  });

  res.status(200).json(books);
};
