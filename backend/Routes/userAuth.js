import express from 'express'
import { signUp } from '../Controller/userAuthController.js'


const router = express.Router()

router.post('/signUp', signUp)

export default router