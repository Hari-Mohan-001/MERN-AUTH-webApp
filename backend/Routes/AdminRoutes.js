
import express from 'express'
import { verifyAdminToken } from '../Middleware/isAdmin.js';
import { adminLogin, createUser, deleteUser, getAllUsers, getUser, signOut, updateUser } from '../Controller/adminController.js';

const adminRouter = express.Router()

adminRouter.post("/signIn",adminLogin)
adminRouter.get("/allUsers", verifyAdminToken, getAllUsers)
adminRouter.get("/getUser/:id", verifyAdminToken, getUser)
adminRouter.post("/updateUser/:id", verifyAdminToken, updateUser)
adminRouter.delete("/deleteUser/:id", verifyAdminToken, deleteUser)
adminRouter.post("/createUser", verifyAdminToken, createUser)
adminRouter.get("/signOut", verifyAdminToken, signOut)

export default adminRouter;

