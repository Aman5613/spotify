import userModel from "../models/user.model.js";
import config from "../config/config.js";
import { publishToQueue } from "../broker/rabbit.js";
import jwt from "jsonwebtoken";
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
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token);
    
    await publishToQueue("user_registered", newUser);
    
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
      error: true,
    });
  }
}

export async function googleOAuthCallback(req, res) {
  try {
    // User info from Google
    const user = req.user;

    // user already exists in our db
    const existingUser = await userModel.findOne({
      $or: [{ googleId: user.id }, { email: user.emails[0].value }],
    });

    // If user exists, generate token and log them in
    // Otherwise, create a new user
    if (existingUser) {
      // Generate JWT token
      const token = jwt.sign(
        {
          id: existingUser._id,
          role: existingUser.role,
        },
        config.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.cookie("token", token);

      res.redirect(config.FRONTEND_URL);

      return res.status(200).json({
        message: "Google user login successful",
        success: true,
        error: false,
        data: existingUser,
      });
    } else {
      // Create a new user
      const newUser = await userModel.create({
        fullName: {
          firstName: user.name.givenName,
          lastName: user.name?.familyName,
        },
        email: user.emails[0].value,
        googleId: user.id,
      });
      // Generate JWT token
      const token = jwt.sign(
        {
          id: newUser._id,
          role: newUser.role,
        },
        config.JWT_SECRET,
        { expiresIn: "7d" },
      );
      res.cookie("token", token);

      await publishToQueue("user_registered", newUser);  // Notify other services about new user registration

      res.redirect(config.FRONTEND_URL);

      return res.status(201).json({
        message: "Google user registration successful",
        success: true,
        error: false,
        data: newUser,
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error" + error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function loginUser(req, res){
  try {

    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if(!existingUser){
      return res.status(400).json({
        message : "Invalid email or password",
        success : false,
        error : true
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordMatch){
      return res.status(400).json({
        message : "Invalid email or password",
        success : false,
        error : true
      })
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", token);

    return res.status(200).json({
      message : "User logged in successfully",
      success : true,
      error : false,
      data : existingUser
    })
    
  } catch (error) {
    return res.status(500).json({
      message : "Internal server error" + error.message || error,
      success : false,
      error : true
    })
  }
}