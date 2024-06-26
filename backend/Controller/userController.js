import { errorHandler } from "../Middleware/errorHandler.js"
import bcrypt from "bcryptjs"
import User from "../Model/userModel.js"

export const updateUser = async(req,res,next)=>{
    if(req.user.userId != req.params.id){
        return next(errorHandler(401, "User is allowed to update"))
    }
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10)    
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id , 
            {
                $set:{
                    userName: req.body.userName,
                    email:req.body.email,
                    password:req.body.password,
                    profileImage:req.body.profileImage
                }
            },
            {new:true}
        )
        const{password , ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)  
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.user.userId != req.params.id){
        return next(errorHandler(401, "Authenicated User is allowed to delete"))
    } 
    try {
         await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user is deleted")
    } catch (error) {
        next(error)
    }  
}