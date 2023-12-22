import Book from "../models/bookModel.js";
import mongoose from "mongoose";
import Author from "../models/authorModel.js";
import { upload } from "../middleware/multer.js";
import Category from "../models/categorieModel.js";
import path from "path";
import fs from "fs";
import { error } from "console";

export const getBooks = async (req, res) => {
    const books = await Book.findAll({include: [Author]});
  
    res.status(200).json(books);
  };
//here i am getting a single book
export const getBook = async (req, res) => {
  const id= req.params;
  if(!id){
    return res.status(400).json({error:"No id provided"});
  }
  try{
  const book = await Book.findByPk(id);
  if(!book){
    return res.status(404).json({error:"book not found"});
  }
  res.status(200).json(book);
  }catch(error){
    res.status(404).json({error:"serever internal error"})
  }
}
//here i ma creating a new book
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
    await newBook.save();

    res.status(201).json({ message: 'Book created successfully', book: newBook });
    }catch(error){
    res.status(500).json({ message: 'Internal server error' });
  }
    
}
//here i am deleting a book 
export const deleteBook = async (req,res) => {
  const id = req.params;
  if(!id){
    return res.status(400).json({error:"no id provided"});
  }

  const book = await Book.destroy({where:{id:id}});
  if(!book){
    return res.status(400).json({error:"no book is found "});
  }
  res.status(200).json("book deleted successfully");
}
//here i am getting the book by the author id 
export const getBookByAuthorId = async (req, res) =>{
  const id= req.params
  if(!id){
    return res.status(404).json({error:"no id provided"});
  }

  const book = await Book.findAll({
    include:{
      model:Author,where:{id:id},
    }
  });
  if(!book){
    return res.status(404).json({error:"Book not found "});
  }

  return res.status(404).json(book);
};
//here i am updating the book
export const updateBook = async (req,res) => {
  try{
    const{
      title,
      ISBN,
      language,
      rate,
      authorId,
      categoryName,
      description,
      publicationDate,
    } = req.body;

    const bookId= req.params.id
    const existingBook = await Book.findById(bookId)
    if(!existingBook){
      return res.status(404).json({message:'book is not found'})
    }

    existingBook.title = title || existingBook.title;
    existingBook.ISBN = ISBN || existingBook.ISBN;
    existingBook.language = language || existingBook.language;
    existingBook.rate = rate || existingBook.rate;
    existingBook.authorId = authorId || existingBook.authorId;
    existingBook.categoryName = categoryName || existingBook.categoryName;
    existingBook.description = description || existingBook.description;
    existingBook.publicationDate = publicationDate || existingBook.publicationDate;

  }catch(error){
    res.status(404).json({error:"error updating book"})
    res.status(500).json({message:"internale server error"})
    
  }}