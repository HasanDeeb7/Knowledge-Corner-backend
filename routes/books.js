import express from 'express';

import {createBook , getBooks , getBook , deleteBook , updateBook} from '../controllers/bookController.js'


const router = express.Router()

// GET all books
 router.get('/',getBooks)

// GET a single book
router.get('/:id',getBook)

// POST a new book
router.post('/', createBook)

// // DELETE a new book
router.delete('/:id',deleteBook)

// // UPDATE a new book
router.patch('/:id',updateBook)

export default router;