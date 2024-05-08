import express from 'express'
import { verifyToken } from '../Middleware/verifyToken.js'
import { updateUser } from '../Controller/userController.js'

const router = express.Router()

router.post("/update/:id" , verifyToken, updateUser)

export default router