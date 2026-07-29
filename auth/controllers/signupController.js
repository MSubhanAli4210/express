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

    const newUser = await User.create({
      email,
      password,
      username,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};