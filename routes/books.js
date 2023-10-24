import express from 'express';
import multer from 'multer';
import path from 'path';
import {createBook , getBooks , getBook , deleteBook , updateBook , getBookByAutherId,getBookByCategoryId} from '../controllers/bookController.js'


  

const router = express.Router()

// GET all books
 router.get('/',getBooks)

// GET a single book
router.get('/:id',getBook)

// GET book by autherID
router.get('/getBookByAutherID/:id',getBookByAutherId)

// GET book by CategoryID
router.get('/getBookByCategoryID/:name',getBookByCategoryId)

// POST a new book
router.post('/',createBook)

// // DELETE a new book
router.delete('/:id',deleteBook)

// // UPDATE a new book
router.patch('/:id',updateBook)

export default router;