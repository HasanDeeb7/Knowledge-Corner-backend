import express from 'express';
import multer from 'multer';
import path from 'path';
import { upload } from "../middleware/multer.js";
import {createBook , getBooks , getBook , deleteBook , updateBook , getBookByAutherId,getBookByCategoryId,getBooksByLimit} from '../controllers/bookController.js'



  

const router = express.Router()

router.get('/limitedBooks',getBooksByLimit)


// GET all books
 router.get('/',getBooks)

// GET a single book
router.get('/:id',getBook)

// GET book by autherID
router.get('/getBookByAutherID/:id',getBookByAutherId)

// GET book by CategoryID
router.get('/getBookByCategoryID/:name',getBookByCategoryId)

// POST a new book
router.post('/',upload.single("image"),createBook)

// // DELETE a new book
router.delete('/:id',deleteBook)

// // UPDATE a new book
router.patch('/:id',upload.single('image'),updateBook)

export default router;