import express from 'express';

const router = express.Router()

// GET all books
 router.get('/',(req,res)=>{
    res.json({mss:'GET all books'})
})

// GET a single book
router.get('/:id',(req,res) =>{
    res.json({mssg:"GET a single book"})
})


// POST a new book
router.post('/',(req,res) =>{
    res.json({mssg:'POST a new book'})
})

// // DELETE a new book
router.delete('/:id',(req,res) =>{
    res.json({mssg:'DELETE a new book'})
})

// // UPDATE a new book
router.patch('/:id',(req,res) =>{
    res.json({mssg:'UPDATE a new book'})
})

export default router;