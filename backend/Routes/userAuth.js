import express from 'express'
import { googleSignIn, signIn, signUp } from '../Controller/userAuthController.js'


const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn',signIn)
router.post('/googleSign',googleSignIn)

export default router