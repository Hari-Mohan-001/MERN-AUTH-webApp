import User from "../Model/userModel.js";
import bcrypt from 'bcryptjs'

export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password , 10)
    const user = new User({ userName, email, password:hashedPassword });
    await user.save();
    res.status(200).json({ messge: "user created" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
