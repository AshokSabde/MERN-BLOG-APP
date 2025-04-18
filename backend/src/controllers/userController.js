import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/userSchema.js";

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const isUsernameExist = await UserModel.findOne({username});
    const isEmailExist = await UserModel.findOne({email});
    if(isEmailExist){
      return res.status(400).json({
        success: false,
        error: "Email Already in Use!",
      })
    }
    if (isUsernameExist) {
      return res.status(400).json({
        success: false,
        error: "username unavailable!",
      });
    }
    if (!username || !password || !email) {
      return res.status(404).json({
        success: false,
        error: "username, email and password are required!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Successfully Created!",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error!",
      data: err,
    });
  }
};
export const login = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await UserModel.findOne({$or:[{username},{email}]});
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Incorrect username or password!",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
      return res.status(400).json({
        success: false,
        error: "Incorrect username or password!",
      });
    }
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET_KEY,{ expiresIn: "1h" })
    res.status(200).json({
        success: true,
        message: "Login Successful!",
        data: {token, "userID": user._id}
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error!",
      data: err,
    });
  }
};
export const getUser = async (req,res)=>{
  try{
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if(!user){
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      })
    }
    res.status(200).json({
      success: true,
      message: "User fetched Successfully!",
      data: user
    })

  }catch(err){
    res.status(500).json({
      success: false,
      error: "Internal Server Error!",
      data: err,
    });
  }
}
export const authenticateUser = async (req,res,next)=>{
  const token = req.header("Authorization")?.split(" ")[1];
  if(!token){
    return res.status(401).json({
      message: "Access Denied!"
    })
  }
  try{
    const verified = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  }catch(err){
    res.status(403).json({ message: "Invalid Token", error: err });
  }
}
