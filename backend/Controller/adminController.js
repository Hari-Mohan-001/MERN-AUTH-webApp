import { errorHandler } from "../Middleware/errorHandler.js";
import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import generateAdminToken from "../utils/generateAdminToken.js";

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email });
    if (!admin) return next(errorHandler(401, "Invalid Credentials"));
    const validPassword = bcrypt.compareSync(password, admin.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));
    if (!admin.isAdmin) return next(errorHandler(401, "You are not an admin"));

    generateAdminToken(res, admin._id);
    const { password: hashedPassword, ...rest } = admin._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({ isAdmin: false });
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
        },
      },
      { new: true }
    );
    res.status(200).json("Updated Successfully");
  } catch (error) {
    next(error);
  }
};


 export const deleteUser = async(req,res,next)=>{
  try {
    const userId = req.params.id
    const deletedUser = await User.findByIdAndDelete(userId)
    res.status(200).json("user deleted")
  } catch (error) {
    next(error)
  }
 
}

export const createUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ messge: "user created" });
  } catch (error) {
    next(error);
  }
};

export const signOut = async(req,res,next)=>{
  try {
    res.clearCookie('adminAccessToken').status(200).json("signout success")
  } catch (error) {
    next(error)
  }
}
