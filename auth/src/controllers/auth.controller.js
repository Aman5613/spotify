import userModel from "../models/user.model.js";
import config from "../config/config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


export async function registerUser(req, res) {
    try {
      const {
        fullName: { firstName, lastName },
        email,
        password,
      } = req.body;

      // if email already exists
      const isUserExists = await userModel.findOne({ email });
      if (isUserExists) {
        return res.status(400).json({
          message: "email already exists",
          success: false,
          error: true,
        });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create user
      const newUser = await userModel.create({
        fullName: {
          firstName,
          lastName,
        },
        email,
        password: hashedPassword,
      });

      //token generation
      const token = jwt.sign({ 
        id : newUser._id,
        role : newUser.role
       }, config.JWT_SECRET, { expiresIn: "7d" });

       res.cookie("token", token);

      return res.status(201).json({
        message: "user registered successfully",
        success: true,
        error: false,
        data: newUser,
      });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error" + error.message || error,
            success: false,
            error: true
        });
    }
}