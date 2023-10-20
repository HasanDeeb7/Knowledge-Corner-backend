import express from 'express';
import dotenv from 'dotenv'
import bookRoutes from './routes/books.js';
// import authorRoutes from './routes/authors.js'
// import categorieRoutes from './routes/categories.js'

import connect from './configs/db.js';

dotenv.config()

// express app
const app = express()


// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})




// routes
app.use('/api/books',bookRoutes);
// app.use('/api/authors',authorRoutes)
// app.use('/api/categories',categorieRoutes)

app.listen(process.env.PORT, () => {
        connect();
    console.log('listening on port 4000')
})




