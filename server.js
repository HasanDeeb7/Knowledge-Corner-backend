import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bookRoutes from './routes/books.js';
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

app.listen(process.env.PORT, () => {
        connect();
    console.log('listening on port 4000')
})




