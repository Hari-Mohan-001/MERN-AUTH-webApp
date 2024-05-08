import express from 'express'
import { verifyToken } from '../Middleware/verifyToken.js'
import { deleteUser, updateUser } from '../Controller/userController.js'

const router = express.Router()

router.post("/update/:id" , verifyToken, updateUser)
router.delete("/delete/:id" , verifyToken, deleteUser)
router.post("/delete/:id" , verifyToken, deleteUser)

export default router