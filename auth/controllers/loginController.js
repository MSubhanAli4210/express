import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "User is not registered, please signup first",
      });
    }
    if (existingUser.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"});

    return res.status(200).json({
      message: "Login successful",
        token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
