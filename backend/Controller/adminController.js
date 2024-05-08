import { errorHandler } from "../Middleware/errorHandler.js"
import User from "../Model/userModel.js"
import bcrypt from 'bcryptjs'
import generateAdminToken from "../utils/generateAdminToken.js"

export const adminLogin = async(req,res,next)=>{
    try {
        const{email, password} = req.body
        const admin = await User.findOne({email})
        if(!admin) return next(errorHandler(401,"Invalid Credentials"))
        const validPassword = bcrypt.compareSync(password, admin.password)
    if(!validPassword) return next(errorHandler(401, "Invalid Credentials"))
    if(!admin.isAdmin) return next(errorHandler(401, "You are not an admin"))
     
    generateAdminToken(res, admin._id)
      const{password:hashedPassword , ...rest} = admin._doc
      res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}

export const getAllUsers =async(req,res,next)=>{
      try {
        const allUsers = await User.find({isAdmin:false})
        res.status(200).json(allUsers)
      } catch (error) {
        next(error)
      }
}