import express from 'express'
import {signUp,signIn,getUser,getUsers,deleteUser,updateUser,updateStatus,getUserById} from '../controllers/userController.js'
import { authenticate } from '../middleware/authenticate.js'

 const userRouter=express.Router()

//Sign Up a user
userRouter.post('/signup',signUp)
userRouter.post('/signin',signIn)
userRouter.get('/getUser/', authenticate, getUser)
userRouter.get('/getAll',getUsers)
userRouter.delete('/delete',deleteUser)
userRouter.put('/update',updateUser)
userRouter.patch('/status',updateStatus)
userRouter.get('/getUser/:id',getUserById)

export default userRouter