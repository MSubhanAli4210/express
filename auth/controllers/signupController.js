import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(409).json({
        message: "User already exists, please login",
      });
    }

    const token = jwt.sign({email, username}, process.env,JWT_SECRET, {expiresIn: "1h"});

    await User.create({
      email,
      password,
      username,
    });
    return res.status(201).json({
      message: "User created successfully",
        token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
