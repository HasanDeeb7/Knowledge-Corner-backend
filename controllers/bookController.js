import Book from '../models/bookModel.js'
import mongoose from 'mongoose'

// get all books

export const getBooks = async (req,res) =>{
    const books = await Book.find({})

    res.status(200).json(books)
}


// get a single book

export const getBook = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such book'})
    }

    const book = await Book.findById(id)

    if(!book){
        return res.status(404).json({error:"No such a book"})
    }

    res.status(200).json(book)
}

// create new book

export const createBook = async (req, res) => {
    const { title, ISBN, publicationDate, description, nbPages, image, language, rating } = req.body

    // add doc to db
    try {
        const book = await Book.create({ title, ISBN, publicationDate, description, nbPages, image, language, rating })

        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a book

export const deleteBook = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such book'})
    }

    const book = await Book.findOneAndDelete({_id : id})

    if(!book){
        return res.status(400).json({error:"No such a book"})
    }

    res.status(200).json(book)

}


// update a book

export const updateBook = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such book'})
    }  

    const book = await Book.findOneAndUpdate({_id : id},{
        ...req.body
    })

    if(!book){
        return res.status(404).json({error:"No such a book"})
    }

    res.status(200).json(book)
}



