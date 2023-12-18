import express from 'express'
import {signUp,signIn,getUser,getUsers,deleteUser,updateUser} from '../controllers/userController.js'

 const userRouter=express.Router()

//Sign Up a user
userRouter.post('/signup',signUp)
userRouter.post('/signin',signIn)
userRouter.get('/getUser/:id',getUser)
userRouter.get('/getAll',getUsers)
userRouter.delete('/delete/:id',deleteUser)
userRouter.put('/update',updateUser)
export default userRouter