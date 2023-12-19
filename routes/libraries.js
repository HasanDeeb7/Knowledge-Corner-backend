import express from "express"
import {
    createLibrary,
    getLibraries,
    getLibrary,
    updateLibrary,
    deleteLibrary
} from '../controllers/libraryController.js'

const libraryRoute=express.Router()

libraryRoute.get('/',getLibraries)
libraryRoute.post('/create',createLibrary)
libraryRoute.get('/:id',getLibrary)
libraryRoute.put('/update',updateLibrary)
libraryRoute.delete('/:id',deleteLibrary)
export default libraryRoute