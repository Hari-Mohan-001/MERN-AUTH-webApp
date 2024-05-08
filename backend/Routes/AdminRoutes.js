
import express from 'express'
import { verifyAdminToken } from '../Middleware/isAdmin.js';
import { adminLogin, getAllUsers } from '../Controller/adminController.js';

const adminRouter = express.Router()

adminRouter.post("/signIn",adminLogin)
adminRouter.get("/allUsers", verifyAdminToken, getAllUsers)

export default adminRouter;

