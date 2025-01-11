import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.SECRET_KEY;

export const generateTokenAndSetItInCookie = async (userId, res) => {
  const token = jwt.sign({userId}, secretKey, { expiresIn: "10d" });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // Set to true for production
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
  });
};
